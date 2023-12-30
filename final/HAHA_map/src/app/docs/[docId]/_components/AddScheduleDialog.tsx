import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState, useRef } from 'react';

type Props = {
    setName: (name) => void;
    setSchLoca:(lo:string[]) => void;
    location: string;
    save: (name:string[], location:string[]) => Promise<void>;
    schLoca: string[];
    schName: string[];
    participateState: boolean;
};

function AddScheduleDialog({setName, setSchLoca, location, save, schLoca, schName, participateState}:Props) {
  const [open, setOpen] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAndSave = () => {
    setOpen(false);
    handleSave();
  };

  async function handleSave (){
    const name = textFieldValue;
    const nameStr = name?.toString();

    let b:string[] = [];

    if(name !== undefined && location !== undefined){
        setName((prev:string[]) => [...prev, nameStr]);
        setSchLoca([...schLoca, location])
        b = [...schName, nameStr];
    }

    // if(location !== undefined){
        
    // }

    const a = [...schLoca, location];

    await save(b,a);

    setTextFieldValue('');
  };


  function handleCancel (){
    setOpen(false);
    setTextFieldValue('');
  }

  return (
    <React.Fragment>
      <Button variant="outlined" className='text-sm mb-1 flex items-center justify-between' onClick={() => {
          if(participateState){
            handleClickOpen();
          }else{
            alert("Please first participate the activity !!");
          }
        }
        }>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M14,16l1,5,6-6ZM20,4H4A1,1,0,0,0,3,5V20a1,1,0,0,0,1,1H15l6-6V5A1,1,0,0,0,20,4Z"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M20,4H4A1,1,0,0,0,3,5V9H21V5A1,1,0,0,0,20,4ZM17,3V5M12,3V5M7,3V5"
            fill="none"
            stroke="#2CA9BC"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        
        <p className='ml-1'>Add Schedule</p>
      </Button>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Add Schedule</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Give this location a name !
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Location Name"
              type="email"
              fullWidth
              variant="standard"
              value={textFieldValue}
              ref={nameInputRef}
              onChange={(e) => setTextFieldValue(e.target.value)}
            />
            
          </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleCloseAndSave}>Add</Button>
        </DialogActions>
      
      </Dialog>
    </React.Fragment>
  );
}

export default AddScheduleDialog;
