import { AiFillDelete, AiFillFileAdd, AiFillFileText } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import ShareDialog from "../[docId]/_components/ShareDialog";


import { createDocument, deleteDocument, getDocuments, getReceiver } from "./actions";

type Props = {
    docId: string;
}

async function Nametag({docId}:Props) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;
  const receiver = await(getReceiver(docId, userId));
  return (
    <>{receiver}</>
  );
}

export default Nametag;
