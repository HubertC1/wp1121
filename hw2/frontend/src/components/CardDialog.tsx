import { useState } from "react";

import { Delete as DeleteIcon } from "@mui/icons-material";
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

import useCards from "@/hooks/useCards";
import { createCard, deleteCard, updateCard } from "@/utils/client";

// this pattern is called discriminated type unions
// you can read more about it here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// or see it in action: https://www.typescriptlang.org/play#example/discriminate-types
type NewCardDialogProps = {
  variant: "new";
  open: boolean;
  onClose: () => void;
  listId: string;
  singer: string;
  url: string;
};

type EditCardDialogProps = {
  variant: "edit";
  open: boolean;
  onClose: () => void;
  listId: string;
  cardId: string;
  title: string;
  singer: string;
  url: string;
  description: string;
};

type CardDialogProps = NewCardDialogProps | EditCardDialogProps;

export default function CardDialog(props: CardDialogProps) {
  const { variant, open, onClose, listId } = props;
  const title = variant === "edit" ? props.title : "";
  const description = variant === "edit" ? props.description : "";
  const singer = variant === "edit" ? props.singer :"";
  const url = variant === "edit" ? props.url:"";

  const [editingTitle, setEditingTitle] = useState(variant === "new");
  const [editingDescription, setEditingDescription] = useState(
    variant === "new",
  );
  const [editingSinger, setEditingSinger] = useState(variant === "new");
  const [editingUrl, setEditingUrl] = useState(variant === "new");

  // using a state variable to store the value of the input, and update it on change is another way to get the value of a input
  // however, this method is not recommended for large forms, as it will cause a re-render on every change
  // you can read more about it here: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newListId, setNewListId] = useState(listId);
  const [newSinger, setNewSinger] = useState(singer);
  const [newUrl, setNewUrl] = useState(url);

  const { lists, fetchCards } = useCards();

  const handleClose = () => {
    onClose();
    if (variant === "edit") {
      setNewTitle(title);
      setNewDescription(description);
      setNewListId(listId);
      setNewSinger(singer);
      setNewUrl(url);
    }
  };

  const handleSave = async () => {
    try {
      if (variant === "new") {
        await createCard({
          title: newTitle,
          description: newDescription,
          list_id: listId,
          singer: newSinger,
          url: newUrl

        });
      } else {
        if (
          newTitle === title &&
          newDescription === description &&
          newListId === listId &&
          newSinger === singer &&
          newUrl === url
        ) {
          return;
        }
        // typescript is smart enough to know that if variant is not "new", then it must be "edit"
        // therefore props.cardId is a valid value
        await updateCard(props.cardId, {
          title: newTitle,
          description: newDescription,
          list_id: newListId,
          singer: newSinger,
          url: newUrl
        });
      }
      fetchCards();
    } catch (error) {
      alert("Error: Failed to save card");
    } finally {
      handleClose();
    }
  };

  const handleDelete = async () => {
    if (variant !== "edit") {
      return;
    }
    try {
      await deleteCard(props.cardId);
      fetchCards();
    } catch (error) {
      alert("Error: Failed to delete card");
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="flex gap-4">
        {editingTitle ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingTitle(false);
              }
            }}
          >
            <Input
              autoFocus
              defaultValue={title}
              onChange={(e) => setNewTitle(e.target.value)}
              className="grow"
              placeholder="Enter a title for this song..."
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingTitle(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newTitle}</Typography>
          </button>
        )}
        <Select
          value={newListId}
          onChange={(e) => setNewListId(e.target.value)}
        >
          {lists.map((list) => (
            <MenuItem value={list.id} key={list.id}>
              {list.name}
            </MenuItem>
          ))}
        </Select>
        {variant === "edit" && (
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent className="w-[600px]">
        {editingDescription ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingDescription(false);
              }
            }}
          >
            <textarea
              className="bg-white/0 p-2"
              autoFocus
              defaultValue={description}
              placeholder="Add a more detailed description..."
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingDescription(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newDescription}</Typography>
          </button>
        )}
        {editingSinger ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingSinger(false);
              }
            }}
          >
            <Input
              autoFocus
              defaultValue={singer}
              onChange={(e) => setNewSinger(e.target.value)}
              className="grow"
              placeholder="Enter a singer..."
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingSinger(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newSinger}</Typography>
          </button>
        )}
        {editingUrl ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingUrl(false);
              }
            }}
          >
            <Input
              autoFocus
              defaultValue={url}
              onChange={(e) => setNewUrl(e.target.value)}
              className="grow"
              placeholder="url of the MV..."
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingUrl(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newUrl}</Typography>
          </button>
        )}
        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
