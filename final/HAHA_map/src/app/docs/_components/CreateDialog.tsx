import { Button } from "@mui/material";
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

import { createActivity } from "./actions";

import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { revalidatePath } from "next/cache";


async function CreateDialog() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const userId = session.user.id;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button className="mr-2" variant={"outlined"}>Add Activity</Button> */}
        <button
            className="flex w-full items-center gap-2 px-3 py-1 text-left text-sm text-slate-500 hover:bg-slate-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9944 10.0011L11.9944 13.9989" stroke="#1C1C1C" strokeWidth="1.69904" strokeLinecap="round"/>
              <path d="M13.9932 12H9.99541" stroke="#1C1C1C" strokeWidth="1.69904" strokeLinecap="round"/>
              <path d="M20.845 12V6.50968C20.845 4.48821 19.2062 2.84949 17.1848 2.84949H6.50419C4.48272 2.84949 2.84399 4.48821 2.84399 6.50968V17.4903C2.84399 19.5117 4.48272 21.1504 6.50419 21.1504H11.8445" stroke="#1C1C1C" strokeWidth="1.69904" strokeLinecap="round"/>
              <path d="M20.7847 15.8827L18.8316 13.8971C18.6335 13.6957 18.3123 13.6957 18.1142 13.8971L14.3579 17.716C14.2491 17.8266 14.1956 17.9813 14.2123 18.1368L14.4272 20.1323C14.4401 20.2525 14.5334 20.3474 14.6517 20.3605L16.6145 20.5789C16.7673 20.5959 16.9196 20.5415 17.0283 20.431L20.7847 16.612C20.9828 16.4106 20.9828 16.0841 20.7847 15.8827Z" stroke="#DF1463" strokeWidth="1.69904" strokeLinecap="round"/>
            </svg>
            <p>Create Activity</p> 
          </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new activity!</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          All fields are required.<br/>
          Start date have to be earlier than end, or activity will not be created.
        </DialogDescription>
        <form
          action={async (e) => {
            "use server";
            const title = e.get("title")?.toString();
            if (!title) return;

            const description = e.get("description")?.toString();
            if (!description) return;

            const dateStart = e.get("dateStart")?.toString();
            if (!dateStart) return;
            console.log(dateStart);
            
            const dateEnd = e.get("dateEnd")?.toString();
            if (!dateEnd) return;

            if (new Date(dateStart) >= new Date(dateEnd)) {
              // Display an error message or handle the validation failure
              console.log("Start date must be earlier than the end date");
              return;
            }

            const createData={title:title, description:description, dateStart:dateStart, dateEnd:dateEnd, organizerId:userId}

            const result = await createActivity(createData);
            if(!result){
              console.log("can't create");
            }else{
              revalidatePath("/docs");
              redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${result.displayId}`)
            }
          }}
          className="flex flex-row gap-4"
        >
            <div className="w-full flex flex-col gap-2 ">

                <Input placeholder="Title" name="title" />

                <Input placeholder="Description" name="description" />

                <DialogDescription>date start</DialogDescription>
                <input
                  type="date"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  name="dateStart"
                />

                <DialogDescription>date end</DialogDescription>
                <input
                  type="date"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  name="dateEnd"
                />
                <Button type="submit">Add</Button>

            </div>           
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDialog;
