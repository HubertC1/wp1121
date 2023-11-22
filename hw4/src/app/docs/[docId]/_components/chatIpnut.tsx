"use client";

// import { createMessage } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";


type Props = {
    content: string[],
    // setContent: React.Dispatch<React.SetStateAction<string[]>>;
    setContent: (newContent: string, newSender: string) => void;
    sender: string[],
    // setSender: (newSender: string) => void;
};

function ChatRoomInput({content, setContent, sender}:Props){
	const url = usePathname();
  const {data:session} = useSession();
  const doc = (url.split('/').pop())!;
  console.log(doc);
  const user = session?.user?.id;
  const [inputContent, setInputContent] = useState<string>("");
  // const [content, setContent] = useState<string>("");
  const router = useRouter();
  if (router === router){console.log("ha")}
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //     return;
  //   }
  // }, [user, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;
    if (!sender) return;
    if (!user) return;
    console.log(user);
    console.log()
    setContent(inputContent, user);
    // setSender(user);
    // createMessage(doc, user, content);
    // sendMessage({ content, senderId: user.displayId });
    setInputContent("");
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Aa"
        value={inputContent}
        onChange={(e) => setInputContent(e.target.value)}
        className="text-md flex-1 border border-gray-300 p-1 rounded-md outline-none focus:border-gray-600 transition duration-200 ease-in-out"
      />
      <button
        type="submit"
        className="bg-black text-white py-1 px-2 rounded-lg text-sm hover:bg-gray-700 transition duration-200 ease-in-out"
      >
        Send
      </button>
    </form>
  );
}

export default ChatRoomInput;
