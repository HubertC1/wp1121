import { useState } from "react";

import { Paper } from "@mui/material";

import CardDialog from "./CardDialog";

import { List } from "@mui/icons-material";

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
      <input
        type="checkbox"
        value="checked"
        onChange={() => onCardCheck(id)}
      />
      
      <button onClick={handleClickOpen} className="text-start w-full" >
        <Paper className="flex w-full flex-col p-2" elevation={6}>
          {title}
          {}
        </Paper>
      </button>
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
