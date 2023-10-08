import { useEffect, useState } from "react";

import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import HeaderBar from "@/components/HeaderBar";
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";

function App() {
  const { lists, fetchLists, fetchCards } = useCards();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [deletingList, setDeletingList] = useState(false);

  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  return (
    <>
      <HeaderBar />
      <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
        <div>
          <h1>My Playlist</h1>
          <Button
            variant="contained"
            className="w-80"
            onClick={() => setNewListDialogOpen(true)}
          >
            <AddIcon className="mr-2" />
            Add
          </Button>
          <br/>
          <br/>
          <Button
            variant="contained"
            className="w-80"
            onClick={() => setDeletingList(true)}
          >
            <AddIcon className="mr-2" />
            Delete
          </Button>
        </div>
        {lists.map((list) => (
          <CardList key={list.id} {...list} />
        ))}
        <NewListDialog
          open={newListDialogOpen}
          onClose={() => setNewListDialogOpen(false)}
        />
      </main>
    </>
  );
}

export default App;
