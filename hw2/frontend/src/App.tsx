import { useEffect, useState } from "react";

import { Add as AddIcon } from "@mui/icons-material";
import { RemoveCircleOutlineOutlined as DeleteIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import  Typography  from "@mui/material/Typography";
import {Grid} from "@mui/material";
import {Divider} from "@mui/material";

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
      <main>
        <div>
          <Typography variant="h1" color={"#7FFFD4"}>{"My Playlist"}</Typography>
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
            onClick={() => {
              if (deletingList){
                setDeletingList(false);
              }else{
                setDeletingList(true);
              }
            }}
          >
            <DeleteIcon className="mr-2" />
            {deletingList?(
              "Done"
            ):(
              "Delete"
            )
            }
          </Button>
        </div>


        <Grid container spacing = {4}>
        {lists.map((list) => (
          <Grid item>
            <CardList key={list.id} {...list} deleting={deletingList} />
          </Grid>
        ))}
        </Grid>
        <NewListDialog
          open={newListDialogOpen}
          onClose={() => setNewListDialogOpen(false)}
        />

      </main>
    </>
  );
}

export default App;
