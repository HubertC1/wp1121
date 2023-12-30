"use client";

// import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useSession } from "next-auth/react";
// import { auth } from "@/lib/auth";
// import { usePathname } from "next/navigation";

type inputType = {
  user: string;
  name: string;
  content: string[];
  senderName: string[];
  setContent: (content: string[], senderId: string[], senderName: string[])=>void;
  senderId: string[];
}

function ChatRoomInput({user, name, content, senderName, setContent, senderId }: inputType) {
  // const url = usePathname();
  // const docId = (url.split('/').pop())!;
  // const {data:session} = useSession();
  // const user = session?.user?.id;
  const [input, setInput] = useState<string>("");
  // const [name, setName] = useState<string>("");
//   useEffect(() => {
//     const getUsername = async() => {
//       // const {data:session} = await auth();
//       const session = await auth();
//       const user = session?.user?.id;
//       console.log("___________DOODODDODODODO");
//       console.log(session);
//       console.log(user);
//         const res = await fetch(`/api/username/${user}`);
//         if (!res.ok) {
//             console.log("can't find user!!!");
//         return;
//         }
//         const temp = await res.json();
//         setName(temp.username);
//     }
//     getUsername();
// }, [user])


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    if (!user) return;

    console.log(input);
    console.log(user);
    const temp1 = [...content, input];
    const temp2 = [...senderId, user];
    const temp3 = [...senderName, name];
    setContent(temp1, temp2, temp3);
    console.log(temp1);
    console.log(temp2);
    console.log(temp3);
    // router.refresh();
    setInput("");
  };
  return (
    <form className="flex gap-2 w-full px-2 items-end mt-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your message here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-md flex-1 border border-gray-300 p-1 rounded-md outline-none focus:border-gray-600 transition duration-200 ease-in-out"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white py-1 px-2 rounded-lg text-sm hover:bg-gray-700 transition duration-200 ease-in-out flex items-center"
      >
        <svg width="24" height="24" viewBox="0 0 1024 1024"  version="1.1">
            <path d="M86.72 425.28a32 32 0 0 0-5.12-3.84 17.6 17.6 0 0 0-5.44-2.88 19.84 19.84 0 0 0-6.08-2.56 27.84 27.84 0 0 0-12.48 0 20.8 20.8 0 0 0-5.76 1.92 23.68 23.68 0 0 0-5.76 2.88l-4.8 3.84a32 32 0 0 0-6.72 10.56 30.08 30.08 0 0 0 0 24.32 37.12 37.12 0 0 0 6.72 10.56 36.8 36.8 0 0 0 10.56 6.72A32 32 0 0 0 64 480a32 32 0 0 0 12.16-2.56 37.12 37.12 0 0 0 10.56-6.72 37.12 37.12 0 0 0 6.72-10.56 30.08 30.08 0 0 0 0-24.32 32 32 0 0 0-6.72-10.56zM192 425.28a32 32 0 0 0 12.48-2.56l160-68.48a32 32 0 0 0-25.28-58.88l-160 68.48a32 32 0 0 0 12.8 61.44z" fill="#ffffff" />
            <path d="M992 72.96A32 32 0 0 0 992 64a32 32 0 0 0 0-3.2 32 32 0 0 0-1.92-7.36v-3.2a32 32 0 0 0-4.8-7.04 32 32 0 0 0-8.64-5.44h-2.88a32 32 0 0 0-11.2-5.76H960a32 32 0 0 0-7.68 0h-2.88l-480 205.76a32 32 0 0 0 25.28 58.88l288-123.52L288 597.76l-107.2-91.84a32 32 0 0 0-41.6 48.64l111.68 96-89.28 267.2a51036.16 51036.16 0 0 0 0 8.32 32 32 0 0 0 0 8.64v2.24a32 32 0 0 0 2.24 4.8 32 32 0 0 0 2.24 4.48l2.88 2.88a32 32 0 0 0 4.48 4.48h3.52l5.44 2.56h4.8L192 960h8l314.56-96 136.64 119.36a32 32 0 0 0 52.8-13.44l288-896z m-597.76 640l-135.36 115.52 56.64-169.92L713.92 317.12z m-64 140.16L416 778.24l41.92 36.48z m328.96 49.92l-196.16-171.52 416-514.88z" fill="#ffffff" />
        </svg>
        
        <p className="ml-1">Send</p>
      </button>
    </form>
  );
}

export default ChatRoomInput;