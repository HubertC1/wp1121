import { BiError } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function DocsPage() {
  return (
    <div className="flex flex-col h-[90vh] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <BiError className="text-yellow-500" size={80} />
        <p className="text-sm font-semibold text-slate-700">
          You already added this chatbox
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
