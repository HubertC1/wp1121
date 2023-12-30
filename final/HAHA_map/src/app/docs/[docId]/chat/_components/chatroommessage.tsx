"use client";

// import { redirect } from "next/navigation";
// import React, { useEffect } from "react";
// import { useSession } from "next-auth/react";
import { AiFillDelete } from "react-icons/ai";
import { useRef, useEffect } from "react";

type inputType = {
  user: string;
  content: string[];
  senderId: string[];
  senderName: string[];
  setContent: (content: string[], senderId: string[], senderName: string[]) => void;
}

function ChatRoomMessages({user, content, senderId, senderName, setContent}: inputType) {
  // const {data:session} = useSession();
  // const user = session?.user?.id;

  const handleDelete = (index: number) => {
    console.log("delete");
    const temp1 = [...content.slice(0, index), ...content.slice(index+1, content.length)];
    const temp2 = [...senderId.slice(0, index), ...senderId.slice(index+1, senderId.length)];
    const temp3 = [...senderName.slice(0, index), ...senderName.slice(index+1, senderName.length)];
    console.log(temp1);
    console.log(temp2);
    setContent(temp1, temp2, temp3);
  }

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [content]);

  return (
    <div className="px-2 pt-4 h-5/6" style={{ overflowY: 'scroll', maxHeight: '525px' }}>
      {
        Array.isArray(content)?(
            content.map((each, index) => {
            const isSender = senderId[index] === user;
            return (
              <div key={index} className="w-full pt-1">
                <div
                  className={`flex flex-row items-end gap-2 ${
                    isSender && "justify-end"
                  }`}
                >
                  {!isSender && (
                    <>
                      <div className="flex flex-col items-start gap-1">
                        <svg width="36" height="36" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M512 661.3c-117.6 0-213.3-95.7-213.3-213.3S394.4 234.7 512 234.7 725.3 330.4 725.3 448 629.6 661.3 512 661.3z m0-341.3c-70.6 0-128 57.4-128 128s57.4 128 128 128 128-57.4 128-128-57.4-128-128-128z" fill="#5F6379" />
                            <path d="M837 862.9c-15.7 0-30.8-8.7-38.2-23.7C744.3 729.5 634.4 661.3 512 661.3s-232.3 68.1-286.8 177.9c-10.5 21.1-36.1 29.7-57.2 19.2s-29.7-36.1-19.2-57.2C217.8 662.3 357 576 512 576s294.2 86.3 363.2 225.2c10.5 21.1 1.9 46.7-19.2 57.2-6.1 3-12.6 4.5-19 4.5z" fill="#5F6379" />
                            <path d="M512 1002.7c-270.6 0-490.7-220.1-490.7-490.7S241.4 21.3 512 21.3s490.7 220.1 490.7 490.7-220.1 490.7-490.7 490.7z m0-896c-223.5 0-405.3 181.8-405.3 405.3S288.5 917.3 512 917.3 917.3 735.5 917.3 512 735.5 106.7 512 106.7z" fill="#3688FF" />
                        </svg>
                      </div>
                    </>
                  )}
                  {isSender && (
                      <button className="flex justify-items-center hover:bg-slate-200" onClick={() => handleDelete(index)}>
                        <AiFillDelete size={16} />
                      </button>
                  )}


                  <div className="flex flex-col">
                    <p className={`flex ${isSender ? "justify-end" : "justify-start"}`}>{senderName[index]}</p>
                    <div
                      className={` rounded-2xl px-3 py-1 leading-6 mb-2 ${
                        isSender ? "bg-blue-500 text-white" : " bg-gray-200 text-black"
                      }`}
                    >                    
                      {each}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ):<></>
      }
      <div ref={messagesEndRef} />
        <style>{`
          ::-webkit-scrollbar {
            width: 0;  /* Remove scrollbar width */
          }

          ::-webkit-scrollbar-thumb {
            background-color: transparent;  /* Make scrollbar thumb transparent */
          }
        `}</style>
    </div>
  );
}

export default ChatRoomMessages;