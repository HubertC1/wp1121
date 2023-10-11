import { useState, useEffect } from "react";

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
  onCardCheck: (selected:boolean, id:string)=>void;
  selectAll: boolean;
};

export default function Card({ id, title, description, singer, url, listId, onCardCheck, selectAll}: CardProps) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  // const [checked, setChecked] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChecked = () => {
    if (checked === false){
      setChecked(true);
    }else{
      setChecked(false);
    }
    // onCardCheck(newChecked, id);
  }

  const handleAll = () =>{
    // console.log("title:"+title);
    if (selectAll === true){
      if (checked === false){
        handleChecked();
        // setChecked(true);
        // onCardCheck(id);
      }
    }else{
      if (checked === true){
        handleChecked();
        // setChecked(false);
        // onCardCheck(id);
      }
    }
  }

  useEffect(handleAll, [selectAll]);

  
  useEffect(() => {
    onCardCheck(checked, id);
  }, [checked]);

  return (
    <main className="flex flex-row">
      <Paper className="flex w-full flex-row p-2" elevation={6}>
        <input
          type="checkbox"
          value="checked"
          // onChange={() => {
          //   console.log("hi");
          //   onCardCheck(id);
          // }}
          onClick={()=>{
            handleChecked();
          }}
          checked = {checked}

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
