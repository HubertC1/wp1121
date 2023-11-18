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
  const { title, setTitle, content, setContent } = useDocument();
  return (
    <div className="w-full">
      <nav className="sticky top-0 flex w-full justify-between p-2 shadow-sm">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Document Title"
          className="rounded-lg px-2 py-1 text-slate-700 outline-0 focus:bg-slate-100"
        />
      </nav>

      <section className="w-full px-4 py-4">
        <textarea
          value={content || ""}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className="h-[80vh] w-full outline-0 "
        />
      </section>
      <ChatRoomInput/>
    </div>
  );
}

export default DocPage;
