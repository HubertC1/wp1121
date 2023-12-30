import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog'

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  actDescirption: string;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}
        className='flex flex-col'
    >
        <DialogTitle
            className='text-center'
        >
            Trip Description
        </DialogTitle>
        <p
        className='text-lg font-normal text-start px-3 mb-3'
        >
            {props.actDescirption}
        </p>
    </Dialog>
  );
}

type DescriptionDialogProps = {
    actDescirption: string;
}

export function DescriptionDialog({actDescirption}: DescriptionDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
        <svg width="36" height="36" 
            className="hover:bg-slate-300 rounded-2xl"
            onClick={handleClickOpen}
            viewBox="0 0 512 512" version="1.1" xmlSpace="preserve">
            <style>{`.st0{fill:#333333;}`}</style>
            <g id="Layer_1" />
            <g id="Layer_2">
                <g>
                <path d="M468.5,70.59H222.11c-8.84,0-16,7.16-16,16v65.6c0,8.84,7.16,16,16,16H468.5c8.84,0,16-7.16,16-16v-65.6C484.5,77.76,477.34,70.59,468.5,70.59z M452.5,136.2H238.11v-33.6H452.5V136.2z" />
                <path d="M379.19,207.2H132.81c-8.84,0-16,7.16-16,16v65.6c0,8.84,7.16,16,16,16h246.39c8.84,0,16-7.16,16-16v-65.6C395.19,214.36,388.03,207.2,379.19,207.2z M363.19,272.8H148.81v-33.6h214.39V272.8z" />
                <path d="M43.5,441.41h246.39c8.84,0,16-7.16,16-16v-65.6c0-8.84-7.16-16-16-16H43.5c-8.84,0-16,7.16-16,16v65.6C27.5,434.24,34.66,441.41,43.5,441.41z M59.5,375.8h214.39v33.6H59.5V375.8z" />
                </g>
            </g>
        </svg>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        actDescirption={actDescirption}
      />
    </div>
  );
}

export default DescriptionDialog;