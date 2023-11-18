import { RxAvatar } from "react-icons/rx";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import { createDocument} from "../../_components/actions";

import { addDocumentAuthor, getDocumentAuthors } from "./actions";

type Props = {
  userId: string;
};
async function ShareDialog({ userId }: Props) {
  const session = await auth();
  if (!session?.user?.id) return null;
  //   const userId = session.user.id;
  // const docId = await createDocument(userId);
  // const authors = await getDocumentAuthors(docId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a chatroom</DialogTitle>
          <DialogDescription>Chat with another user!</DialogDescription>
        </DialogHeader>
        <form
          action={async (e) => {
            "use server";
            const email = e.get("email");
            if (!email) return;
            if (typeof email !== "string") return;
            const docId = await createDocument(userId);
            const authors = await getDocumentAuthors(docId);
            const result = await addDocumentAuthor(docId, email);
            // if (!result) {
            //   redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${docId}?user:${session!.user!.id}`);
            // }
            revalidatePath("/docs");
            redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${docId}`);
            
          }}
          className="flex flex-row gap-4"
        >
          <Input placeholder="Email" name="email" />
          <Button type="submit">Add</Button>
        </form>
        {/* <div className="flex w-full flex-col gap-1">
          <h1 className="w-full font-semibold text-slate-900">Authors</h1>
          {authors.map((author, index) => (
            <form key={index} className="flex w-full items-center gap-2">
              <RxAvatar size={30} />
              <div className="flex grow flex-col ">
                <h2 className="text-sm font-semibold">{author.username}</h2>
                <p className="text-xs text-gray-600">{author.email}</p>
              </div>
            </form>
          ))}
        </div> */}
      </DialogContent>
    </Dialog>
  );
}

export default ShareDialog;
