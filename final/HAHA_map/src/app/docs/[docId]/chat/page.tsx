"use client";

import { useDocument } from "@/hooks/useDocument";
import ChatRoomInput from "./_components/chatroomInput";
import ChatRoomMessages from "./_components/chatroommessage";
import { useRouter, useParams} from "next/navigation";
// import { useEffect, useState } from "react";
// import useSchedule from "@/hooks/useSchedule";
// import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { publicEnv } from "@/lib/env/public";
// import { Redirect } from "next";

function ChatPage() {
  const router = useRouter();
  const { docId } = useParams();
  const activityId = Array.isArray(docId) ? docId[0] : docId;

  const { content, setContent, senderId, senderName } = useDocument();

  
  const {data:session} = useSession();
  if (!session?.user?.id){
    router.push(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const user = session?.user?.id;
  const name = session?.user?.username;
  

  return (
    <div className="w-full h-full">
          <nav className="w-full shadow-md p-3 flex justify-items-center">
            <svg width="30" height="30" 
              className="hover:bg-slate-200" 
              viewBox="0 0 24 24" fill="none"
              onClick={() => {
                router.push(`/docs/${activityId}`);
              }} 
              >
                <path opacity="0.5" d="M20 12.75 C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25V12.75ZM20 11.25H4V12.75H20V11.25Z" fill="#1C274C"/>
                <path d="M10 6L4 12L10 18" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            <p className="text-xl font-semibold ml-2">Chatroom</p>
          </nav>

          <div className="flex flex-col h-full">
              <ChatRoomMessages
                user={user??""}
                content={content}
                senderId={senderId}
                senderName={senderName}
                setContent={setContent}

              />

              <ChatRoomInput 
                user={user??""}
                name={name??""}
                content={content}
                senderName={senderName}
                setContent={setContent}
                senderId={senderId}
              />
          </div>
    </div>
  );
}

export default ChatPage;
