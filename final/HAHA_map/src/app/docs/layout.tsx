import Navbar from "./_components/Navbar";

type Props = {
  children: React.ReactNode;
  params: { docId: string };
};

function DocsLayout({ children, params }: Props) {
  console.log("params", params.docId);
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="flex-rows fixed top-0 flex h-screen w-full ">
      {/* overflow-y-scroll for child to show scrollbar */}
        <nav className="flex w-2/5 flex-col border-r bg-slate-100 pb-10 overflow-y-scroll">
          <Navbar 
            activityID={params.docId}
          />
        </nav>
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="w-full">{children}</div>
    </main>
  );
}

export default DocsLayout;
