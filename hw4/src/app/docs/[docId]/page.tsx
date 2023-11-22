"use client";
 
import { NextResponse, type NextRequest } from "next/server";
import ChatRoomInput from "./_components/chatIpnut";
import { getDocumentAuthors } from "./_components/actions";
import { useDocument } from "@/hooks/useDocument";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { auth } from "@/lib/auth";

// const getUser = async() =>{
//   const session = await auth();
//   if (!session || !session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   const userId = session.user.id;
//   return userId;
// }

function DocPage() {
  const router = useRouter();
  // const docId = typeof router.query.docId === 'string' ? router.query.docId : 'default_id';
  const url = usePathname();
  const docId = (url.split('/').pop())!;
  const searchParams = useSearchParams();
  const {data:session} = useSession();
  const userId = session?.user?.id;
  console.log(userId);
  // const user = getUser();
  const { title, setTitle, content, setContent, sender } = useDocument();
  return (

    <div className="w-full h-full overflow-hidden flex flex-col shadow-lg">

      <nav className="w-full shadow-md p-3 text-md font-semibold">Chatroom</nav>
      <div className="overflow-y-scroll grow">
        <div className="px-2 pt-4">
          {content?.map((message, index) => {
            const isSender = sender[index] === userId;
            return (
              <div key={index} className="w-full pt-1">
                <div
                  className={`flex flex-row items-end gap-2 ${
                    isSender && "justify-end"
                  }`}
                >
                  {/* {!isSender && (
                    <Avatar
                      displayId={message.senderId}
                      classname="bg-black text-white w-8 h-8"
                    />
                  )} */}
                  <div
                    className={`max-w-[60%] rounded-2xl px-3 py-1 leading-6 ${
                      isSender ? "bg-black text-white" : " bg-gray-200 text-black"
                    }`}
                  >
                    {message}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-2">
      <ChatRoomInput
          content={content}
          setContent={setContent}
          sender={sender}
          // setSender={setSender}
        />
      </div>
    </div>



  );
}

export default DocPage;
