
import { redirect } from "next/navigation";


import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";


import { getReceiver } from "./actions";

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
