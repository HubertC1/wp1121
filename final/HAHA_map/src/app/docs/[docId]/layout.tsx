// import ShareDialog from "./_components/ShareDialog";
// import ScheduleList from "./_components/ScheduleList";
// import { Button } from "@mui/material";


type Props = {
  children: React.ReactNode;
  params: { docId: string };
};

function DocEditorLayout({ children }: Props) {
  

  return (
    <>
        <div className="fixed right-4 top-3 z-50">
        </div>
        
        <div className="col-span-2 h-full">{children}</div>
    </>
  );
}

export default DocEditorLayout;
