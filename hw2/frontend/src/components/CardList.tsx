import { useRef, useState } from "react";

// import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
// import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { deleteList, updateList } from "@/utils/client";

// import Card from "./Card";
import type { CardProps } from "./Card";
// import CardDialog from "./CardDialog";
import ListDialog  from "./ListDialog";

import imageToAdd from "../../images/edSheeran.jpeg"

export type CardListProps = {
  id: string;
  name: string;
  cards: CardProps[];
  description: string;
  deleting: boolean;
};

export default function CardList({ id, name, cards, description, deleting}: CardListProps) {
  // const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [openListDialog, setOpenListDialog] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const { fetchLists } = useCards();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdateName = async () => {
    if (!inputRef.current) return;

    const newName = inputRef.current.value;
    if (newName !== name) {
      try {
        await updateList(id, { name: newName });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEditingName(false);
  };

  const handleDelete = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };

  return (
    <>
      <Paper className="w-80 p-6">
        {cards.length==1?(
          <Typography variant="h4" color="#7FFFD4">{cards.length} song</Typography>
        ):(
          <Typography variant="h4" color="#7FFFD4">{cards.length} songs</Typography>
        )
        }
        <div className="flex gap-4">
          
          {editingName ? (
            <ClickAwayListener onClickAway={handleUpdateName}>
              <Input
                autoFocus
                defaultValue={name}
                className="grow"
                placeholder="Enter a new name for this list..."
                sx={{ fontSize: "2rem" }}
                inputRef={inputRef}
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="w-full rounded-md p-2 hover:bg-white/10"
            >
              <Typography className="text-start" variant="h4">
                {name}
              </Typography>
            </button>


          )}
          <div className="grid place-items-center">
            {deleting?(
              <IconButton color="error" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            ):(
              <></>
            )}
          </div>
        </div>
        <img src={imageToAdd} alt="cover" onClick={()=>setOpenListDialog(true)}/>

        <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />
        <ListDialog 
          open = {openListDialog}
          onClose = {()=>setOpenListDialog(false)}
          id={id}
          cards = {cards}
          name = {name}
          description = {description}
        />
        {/* <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
          <Button
            variant="contained"
            onClick={() => setOpenNewCardDialog(true)}
          >
            <AddIcon className="mr-2" />
            Add a card
          </Button>
        </div> */}
      </Paper>
      {/* <CardDialog
        variant="new"
        open={openNewCardDialog}
        onClose={() => setOpenNewCardDialog(false)}
        listId={id}
      /> */}
    </>
  );
}
