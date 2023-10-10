import { useRef, useState } from "react";

// import { Delete as DeleteIcon, Description } from "@mui/icons-material";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import {Paper} from "@mui/material"

// import {
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";

import Card from "./Card";
import type { CardProps } from "./Card";
import CardDialog from "./CardDialog";
import useCards from "@/hooks/useCards";
import {  deleteCard } from "@/utils/client";
import {  updateList } from "@/utils/client";

import imageToAdd from "../../images/edSheeran.jpeg"
// this pattern is called discriminated type unions
// you can read more about it here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// or see it in action: https://www.typescriptlang.org/play#example/discriminate-types

//*
// type NewCardDialogProps = {
//   variant: "new";
//   open: boolean;
//   onClose: () => void;
//   listId: string;
// };
const theme = createTheme({
  palette: {
    primary:{
      main: "#7FFFD4"
    },
    secondary:{
      main:"#DC143C"
    }
  }
})

type ListDialogProps = {
    open: boolean;
    onClose: () => void;
    id: string;
    cards: CardProps[];
    name: string;
    description: string;
}

//*
// type EditCardDialogProps = {
//   variant: "edit";
//   open: boolean;
//   onClose: () => void;
//   listId: string;
//   cardId: string;
//   title: string;
//   description: string;
// };

//*
// type CardDialogProps = NewCardDialogProps | EditCardDialogProps;

export default function ListDialog({open, onClose,id, cards, name, description}: ListDialogProps){
    // const {open, onClose, id, cards, name, description} = props;
    const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const inputRef0 = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const {fetchLists, fetchCards} = useCards();

    const toggleItemSelection = (itemId: string) =>{
      if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter((id) => id !== itemId));
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
    };

    const deleteCheckedCards = async() =>{
      if (selectedItems.length === 0){
        alert("No cards selected!");
        return;
      }
      let deleteMessage:string = "Do you want to delete the following songs: |";
      for (let i = 0; i<selectedItems.length; ++i){
        for (let j = 0; j<cards.length; ++j){
          if (cards[j].id === selectedItems[i]){
            deleteMessage += (cards[j].title+"|");
          }
        }
      }
      let allowDelete:boolean = confirm(deleteMessage);
      if (allowDelete){
        for (let i = 0; i<selectedItems.length; ++i){
          try{
            await deleteCard(selectedItems[i]);
            fetchCards();
          }catch (error){
            // alert("Error: Failed to delete cards");
          }
        }        
      } 
    }

    const handleUpdateName = async () => {
      if (!inputRef0.current) return;
  
      const newName = inputRef0.current.value;
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

    const handleUpdateDescription = async () => {
      
      if (!inputRef.current) return;
  
      const newDescription = inputRef.current.value;
      if (newDescription !== description) {
        
        try {
          await updateList(id, {description : newDescription });
          fetchLists();
        } catch (error) {
          alert("Error: Failed to update list name");
        }
      }
      setEditingDescription(false);
    };
    return(
    
      <Dialog open={open} onClose={onClose} fullScreen={true}>
        <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
          <img src= {imageToAdd} width="25%"></img>
          <main className="flex max-w-full flex-col">
            {
              editingName?(
                <ClickAwayListener onClickAway={handleUpdateName}>
                <Input
                  autoFocus
                  defaultValue={name}
                  className=""
                  placeholder="Enter a description for this list..."
                  sx={{ fontSize: "6rem" }}
                  inputRef={inputRef0}
                />
                
                </ClickAwayListener>
              ):(
                <Button
                  onClick={() => setEditingName(true)}
                >
                  <Typography variant="h1" color = "#7FFFD4" align="left">{name}</Typography>
                </Button>
              )
            }
            {
              editingDescription?(
                <ClickAwayListener onClickAway={handleUpdateDescription}>
                <Input
                  autoFocus
                  defaultValue={description}
                  className=""
                  placeholder="Enter a description for this list..."
                  sx={{ fontSize: "2rem" }}
                  inputRef={inputRef}
                />
                </ClickAwayListener>
              ):(
                <Button
                  onClick={() => setEditingDescription(true)}
                >
                  <Typography className="text-start" variant="h4">
                    {description}
                  </Typography>
                </Button>
              )
            }
          </main>
        </main>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2} className="px-24">
            <Grid item>
              <Button
                variant="contained"
                onClick={() => setOpenNewCardDialog(true)}
                className="w-40"
                color = "primary"
              >
                {/* <AddIcon className="mr-2" /> */}
                Add a card
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {onClose()}}
                className="w-40"
                color = "primary"
              >
                {/* <AddIcon className="mr-2" /> */}
                Close
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {deleteCheckedCards()}}
                className="w-40"
                color = "secondary"
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
        <div className="flex flex-col py-12 px-24">
          <main className="flex flex-row">
            <Paper className="flex w-full flex-row p-2" elevation={6}>
              <input
                type="checkbox"
                value="checked"
                // onChange={() => onCardCheck(id)}
              />
              <button className="text-start w-full flex flex-row" >
            
                <main className="px-12">
                  song
                </main>
                <main className="mx-auto">
                  singer
                </main>
              </button>
              <a target="_blank">url</a>
            </Paper>
          </main>
        </div>  
        <div className="flex flex-col py-12 px-24">
          {cards.map((card) => (
              <Card key={card.id} {...card} onCardCheck={toggleItemSelection} />
          ))}
        </div>
        <CardDialog
          variant="new"
          open={openNewCardDialog}
          onClose={() => setOpenNewCardDialog(false)}
          listId={id}
        />
      </Dialog>
    )
}


