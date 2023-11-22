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
import { checkAccount, checkChatbox, createDocument} from "../../_components/actions";

import { addDocumentAuthor, getDocumentAuthors } from "./actions";

type Props = {
    errorType: string;
    isOpen: boolean;
};
async function errorDialog({ errorType, isOpen}: Props) {
  const session = await auth();
  if (!session?.user?.id) return null;
  //   const userId = session.user.id;
  // const docId = await createDocument(userId);
  // const authors = await getDocumentAuthors(docId);

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>OOPS!</DialogTitle>
          <DialogDescription>An error occured!</DialogDescription>
        </DialogHeader>
        <p>{errorType}</p>
      </DialogContent>
    </Dialog>
  );
}

export default errorDialog;
