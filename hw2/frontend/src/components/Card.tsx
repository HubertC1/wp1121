import { useState } from "react";

import { Paper } from "@mui/material";

import CardDialog from "./CardDialog";

// import { Link } from "@mui/icons-material";

// import { List, CheckBox } from "@mui/icons-material";

export type CardProps = {
  id: string;
  title: string;
  description: string;
  singer: string;
  url: string;
  listId: string;
  onCardCheck: (id:string)=>void;
};

export default function Card({ id, title, description, singer, url, listId, onCardCheck}: CardProps) {
  const [open, setOpen] = useState(false);
  // const [checked, setChecked] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };


  return (
    <main className="flex flex-row">
      <Paper className="flex w-full flex-row p-2" elevation={6}>
        <input
          type="checkbox"
          value="checked"
          onChange={() => onCardCheck(id)}
        />
      {/* <CheckBox
        // checked = {checked}
        color="success"
        // value = "checked"
        onChange = {()=>onCardCheck(id)}
      /> */}
      
        <button onClick={handleClickOpen} className="flex  w-full flex-row py-3" >
          
            <main className="px-12">
              {title}
            </main>
            <main className="mx-auto">
              {singer}
            </main>
        </button>
        <a href={url} target="_blank" rel="noreferrer" className="text-right py-3">{url}</a>
      </Paper>
      <CardDialog
        variant="edit"
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        listId={listId}
        cardId={id}
        singer={singer}
        url={url}
      />
    </main>
  );
}
