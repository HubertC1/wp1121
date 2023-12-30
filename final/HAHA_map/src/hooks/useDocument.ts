import { useEffect, useMemo,useState } from "react";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

import { useDebounce } from "use-debounce";

import { pusherClient } from "@/lib/pusher/client";
import type { Activity_message, User } from "@/lib/types/db";

type PusherPayload = {
  senderId: User["id"];
  messages: Activity_message;
};

export const useDocument = () => {
  const { docId } = useParams();
  const documentId = Array.isArray(docId) ? docId[0] : docId;

  const [document, setDocument] = useState<Activity_message | null>(null);
  const [dbDocument, setDbDocument] = useState<Activity_message | null>(null);
  // [NOTE] 2023.11.18 - Extracting the debounceMilliseconds to a constant helps ensure the two useDebounce hooks are using the same value.
  const debounceMilliseconds = 300;
  const [debouncedDocument] = useDebounce(document, debounceMilliseconds);
  const [debouncedDbDocument] = useDebounce(dbDocument, debounceMilliseconds);
  const router = useRouter();

  const { data: session } = useSession();
  const userId = session?.user?.id;

  // [FIX] 2023.11.18 - This memo should compare the debounced values to avoid premature updates to the DB.
  const isSynced = useMemo(() => {
    if (debouncedDocument === null || debouncedDbDocument === null) return true;
    if(debouncedDbDocument.messages_content.length !== debouncedDocument.messages_content.length
      || debouncedDbDocument.messages_senderId.length !== debouncedDocument.messages_senderId.length
      || debouncedDbDocument.messages_senderName.length !== debouncedDocument.messages_senderName.length) return false;
    for(let i = 0; i < debouncedDbDocument.messages_content.length; i++){
      if(debouncedDbDocument.messages_content[i] !== debouncedDocument.messages_content[i]
        || debouncedDbDocument.messages_senderId[i] !== debouncedDocument.messages_senderId[i]
        || debouncedDbDocument.messages_senderName[i] !== debouncedDocument.messages_senderName[i]) return false;
    }
    return true;
  }, [debouncedDocument, debouncedDbDocument]);

  // When the debounced document changes, update the document
  // [FIX] 2023.11.18 - Listen to debouncedDbDocument instead of dbDocument.
  // Explanation: This useEffect should trigger on the change of the debouncedDocument and debouncedDbDocument.
  //              Originally, it was triggered by debouncedDocument but dbDocument.
  //              Therefore, when the received pusher event updates the document and the dbDocument.
  //              This useEffect will trigger twice: one when dbDocument is updated and another when debouncedDocument is updated.
  //              However, the two updates PUTs sends conflicting pusher events to the other clients, causing the document to twitch indefinitely.
  useEffect(() => {
    // [NOTE] 2023.11.18 - If either of the debounced value is null, then `isSynced` must be true. 
    //                     Therefore, we don't need to explicitly check for their null values.
    if (isSynced) return;

    const updateDocument = async () => {
      if (!debouncedDocument) return;
      // [NOTE] 2023.11.18 - This PUT request will trigger a pusher event that will update the document to the other clients.
      const res = await fetch(`/api/messages/${documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages_content: debouncedDocument.messages_content,
          messages_senderId: debouncedDocument.messages_senderId,
          messages_senderName: debouncedDocument.messages_senderName,
        }),
      });
      if (!res.ok) {
        return;
      }
      const data: Activity_message = await res.json();
      // Update the navbar if the title changed
      if (debouncedDbDocument?.messages_content !== data.messages_content) {
        router.refresh();
      }
      setDbDocument(data);
    };
    updateDocument();
  }, [debouncedDocument, documentId, router, debouncedDbDocument, isSynced]);

  // Subscribe to pusher events
  useEffect(() => {
    if (!documentId) return;
    // Private channels are in the format: private-...
    const channelName = `private-${documentId}`;
    // const channelName = `private-haha`;

    try {
      const channel = pusherClient.subscribe(channelName);
      console.log("count");
      console.log(channel)
      
      channel.bind("doc:update", ({ senderId, messages: received_document }: PusherPayload) => {
        if (senderId === userId) {
          return;
        }
        // [NOTE] 2023.11.18 - This is the pusher event that updates the dbDocument.
        setDocument(received_document);
        setDbDocument(received_document);
        router.refresh();
      });
    } catch (error) {
      console.error(error);
      router.push(`/docs/${documentId}`);
    }
    

    // Unsubscribe from pusher events when the component unmounts
    return () => {
      pusherClient.unsubscribe(channelName);
    };
  }, [documentId, router, userId]);

  useEffect(() => {
    if (!documentId) return;
    const fetchDocument = async () => {
      const res = await fetch(`/api/messages/${documentId}`);
      if (!res.ok) {
        console.log(res);
        setDocument(null);
        router.push(`/docs/${documentId}`);
        return;
      }
      const data = await res.json();
      setDocument(data);
      setDbDocument(data);
    };
    fetchDocument();
  }, [documentId, router]);


  const content = document?.messages_content || [];
  const senderId = document?.messages_senderId || [];
  const senderName = document?.messages_senderName || [];
  const setContent = (newContent: string[], newSenderId: string[], newSenderName: string[]) => {
    if (document === null) return;
    setDocument({
      ...document,
      messages_content: newContent,
      messages_senderId: newSenderId,
      messages_senderName: newSenderName,
    });
  };

  return {
    documentId,
    document,
    content,
    senderName,
    setContent,
    senderId,
  };
};
