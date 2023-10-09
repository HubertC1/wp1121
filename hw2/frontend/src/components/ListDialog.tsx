import { useRef, useState } from "react";

import { Delete as DeleteIcon, Description } from "@mui/icons-material";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Checkbox, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
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
import { createCard, deleteCard, updateCard } from "@/utils/client";
import { deleteList, updateList } from "@/utils/client";

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

export default function ListDialog({open, onClose, id, cards, name, description}: ListDialogProps){
    // const {open, onClose, id, cards, name, description} = props;
    const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const {fetchLists} = useCards();
    const handleUpdateDescription = async () => {
      
      if (!inputRef.current) return;
  
      const newDescription = inputRef.current.value;
      if (newDescription !== description) {
        
        try {
          console.log("fuck your mom");
          console.log(id);
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
          <main>
            <Typography variant="h1" color = "#7FFFD4">{name}</Typography>
            {
              editingDescription?(
                <ClickAwayListener onClickAway={handleUpdateDescription}>
                <Input
                  autoFocus
                  defaultValue={description}
                  className="grow"
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
          </Grid>
        </ThemeProvider>
        <Grid container spacing={2} className="py-12 px-24">
          {cards.map((card) => (
            <Grid item>
              <Checkbox/>
              <Card key={card.id} {...card} />
            </Grid>
          ))}
        </Grid>
        <CardDialog
          variant="new"
          open={openNewCardDialog}
          onClose={() => setOpenNewCardDialog(false)}
          listId={id}
        />
      </Dialog>
    )
}

// export default function CardDialog(props: CardDialogProps) {
//   const { variant, open, onClose, listId } = props;
//   const title = variant === "edit" ? props.title : "";
//   const description = variant === "edit" ? props.description : "";

//   const [editingTitle, setEditingTitle] = useState(variant === "new");
//   const [editingDescription, setEditingDescription] = useState(
//     variant === "new",
//   );

//   // using a state variable to store the value of the input, and update it on change is another way to get the value of a input
//   // however, this method is not recommended for large forms, as it will cause a re-render on every change
//   // you can read more about it here: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
//   const [newTitle, setNewTitle] = useState(title);
//   const [newDescription, setNewDescription] = useState(description);
//   const [newListId, setNewListId] = useState(listId);

//   const { lists, fetchCards } = useCards();

//   const handleClose = () => {
//     onClose();
//     if (variant === "edit") {
//       setNewTitle(title);
//       setNewDescription(description);
//       setNewListId(listId);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (variant === "new") {
//         await createCard({
//           title: newTitle,
//           description: newDescription,
//           list_id: listId,
//         });
//       } else {
//         if (
//           newTitle === title &&
//           newDescription === description &&
//           newListId === listId
//         ) {
//           return;
//         }
//         // typescript is smart enough to know that if variant is not "new", then it must be "edit"
//         // therefore props.cardId is a valid value
//         await updateCard(props.cardId, {
//           title: newTitle,
//           description: newDescription,
//           list_id: newListId,
//         });
//       }
//       fetchCards();
//     } catch (error) {
//       alert("Error: Failed to save card");
//     } finally {
//       handleClose();
//     }
//   };

//   const handleDelete = async () => {
//     if (variant !== "edit") {
//       return;
//     }
//     try {
//       await deleteCard(props.cardId);
//       fetchCards();
//     } catch (error) {
//       alert("Error: Failed to delete card");
//     } finally {
//       handleClose();
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle className="flex gap-4">
//         {editingTitle ? (
//           <ClickAwayListener
//             onClickAway={() => {
//               if (variant === "edit") {
//                 setEditingTitle(false);
//               }
//             }}
//           >
//             <Input
//               autoFocus
//               defaultValue={title}
//               onChange={(e) => setNewTitle(e.target.value)}
//               className="grow"
//               placeholder="Enter a title for this card..."
//             />
//           </ClickAwayListener>
//         ) : (
//           <button
//             onClick={() => setEditingTitle(true)}
//             className="w-full rounded-md p-2 hover:bg-white/10"
//           >
//             <Typography className="text-start">{newTitle}</Typography>
//           </button>
//         )}
//         <Select
//           value={newListId}
//           onChange={(e) => setNewListId(e.target.value)}
//         >
//           {lists.map((list) => (
//             <MenuItem value={list.id} key={list.id}>
//               {list.name}
//             </MenuItem>
//           ))}
//         </Select>
//         {variant === "edit" && (
//           <IconButton color="error" onClick={handleDelete}>
//             <DeleteIcon />
//           </IconButton>
//         )}
//       </DialogTitle>
//       <DialogContent className="w-[600px]">
//         {editingDescription ? (
//           <ClickAwayListener
//             onClickAway={() => {
//               if (variant === "edit") {
//                 setEditingDescription(false);
//               }
//             }}
//           >
//             <textarea
//               className="bg-white/0 p-2"
//               autoFocus
//               defaultValue={description}
//               placeholder="Add a more detailed description..."
//               onChange={(e) => setNewDescription(e.target.value)}
//             />
//           </ClickAwayListener>
//         ) : (
//           <button
//             onClick={() => setEditingDescription(true)}
//             className="w-full rounded-md p-2 hover:bg-white/10"
//           >
//             <Typography className="text-start">{newDescription}</Typography>
//           </button>
//         )}
//         <DialogActions>
//           <Button onClick={handleSave}>save</Button>
//           <Button onClick={handleClose}>close</Button>
//         </DialogActions>
//       </DialogContent>
//     </Dialog>
//   );
// }
