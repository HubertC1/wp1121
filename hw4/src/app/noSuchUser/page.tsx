import { BiError } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import Link from "next/link";

function DocsPage() {
	const handleClick = () =>{
		redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs`);
	}
  return (
    <div className="flex flex-col h-[90vh] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <BiError className="text-yellow-500" size={80} />
        <p className="text-sm font-semibold text-slate-700">
          No such user
        </p>
      </div>
			<Link
				className="grow px-3 py-1"
				href={`/docs`}
			>
				<Button>
					Back
				</Button>
			</Link>
    </div>
  );
}
export default DocsPage;
