// import ShareDialog from "./_components/ShareDialog";

type Props = {
  children: React.ReactNode;
  params: { docId: string };
};

function DocEditorLayout({ children, params }: Props) {
  console.log(params);
  return (
    <div className="w-full">
      {children}
    </div>
  );
}

export default DocEditorLayout;
