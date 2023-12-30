import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PlaceIcon from '@mui/icons-material/Place';
// import type { Activity_detial } from "@/lib/types/db";
import { ListItem } from '@mui/material';
import { useActivity } from '@/hooks/useActivity';

type ScheduleListProps = {
  // activity: Activity_detial | undefined;
  setLoca: (lo: string) => void;
  name: string[];
  location: string[];
  participateState: boolean; 
}

function ScheduleList({setLoca, name, location, participateState}: ScheduleListProps) {
  const { postSchedule, setSchLoca, setSchName} = useActivity();

  const setMarkerLocation = (index: number) => {
    setLoca(location[index]);
  }
  const swap = (index: number) => {
    const newScheduleName: string[] = [];
    const newScheduleLocation: string[] = [];
    for(let i = 0; i < name.length; i++){
      newScheduleName[i] = name[i];
      newScheduleLocation[i] = location[i];
    }
    newScheduleName[index-1] = name[index];
    newScheduleName[index] = name[index-1];
    newScheduleLocation[index-1] = location[index];
    newScheduleLocation[index] = location[index-1];
    setSchLoca(newScheduleLocation);
    setSchName(newScheduleName);
    console.log(name);
    postSchedule(newScheduleName, newScheduleLocation);
  }
  const handledelete = (index: number) => {
    const newScheduleName = [...name]; // Clone the name array
    const newScheduleLocation = [...location]; // Clone the location array
  
    newScheduleName.splice(index, 1);
    newScheduleLocation.splice(index, 1);
  
    setSchLoca(newScheduleLocation); // Assuming this is a state setter function
    setSchName(newScheduleName); // Assuming this is a state setter function
  
    console.log(newScheduleName, newScheduleLocation); // Log the new arrays
    postSchedule(newScheduleName, newScheduleLocation);
  };
  
  return (
    <>
      <div className="schedule-list-container bg-slate-100 h-9/12" style={{  overflowY: 'scroll', borderRadius: '12px', height : '400px'}}>
      <List>
        {location.map((act, index) =>
          (
            <ListItem key = {index} sx={{ height: '40px', borderRadius : '8px'}} className='flex mb-3'>
              <ListItemAvatar>
                <Avatar
                  className='hover:bg-slate-300 rounded-xl'
                  onClick={() => {setMarkerLocation(index)}}
                >
                  <PlaceIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={name[index]} secondary={
                act
                .split('/') // Split the string at "-"
                .map((part) => part.trim().slice(0, 6)) // Extract the first 5 words from each part
                .join('/')}  sx={{ whiteSpace: 'nowrap' }}
              />

              <div className={`${(index != 0) ? "hover:bg-slate-300" : ''} rounded-2xl mr-1`} onClick={() => {
                if(participateState && index !== 0){
                  swap(index);
                }else{
                  alert("Please first participate the activity !");
                }
                }}>
                <svg fill={`${(index != 0) ? "#88c7f7" : "#b7bdb8"}`} height="24" width="24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve">
                  <g>
                    <path d="M24.4,24c-0.9,0-1.8-0.3-2.5-1l-5.8-5.7c-0.1-0.1-0.2-0.1-0.3,0L10.1,23c-1.4,1.4-3.6,1.4-5,0c-0.7-0.7-1-1.6-1-2.5
                    c0-1,0.4-1.8,1-2.5l9.4-9.3c0.9-0.9,2.3-0.9,3.1,0l9.4,9.3c0.7,0.7,1,1.6,1,2.5c0,1-0.4,1.8-1,2.5C26.2,23.7,25.3,24,24.4,24z" />
                  </g>
                </svg>
              </div>

              <div className={`${(index != location.length -1) ? "hover:bg-slate-300" : ''} rounded-2xl mr-1`} onClick={() => {
                if(participateState && index !== location.length-1){
                  swap(index+1);
                }else{
                  alert("Please first participate the activity !");
                }
              }}>
                <svg fill={`${(index != location.length - 1) ? "#88c7f7" : "#b7bdb8"}`} height="24" width="24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve">
                  <g>
                    <path d="M16,25c-0.6,0-1.1-0.2-1.6-0.6l-9.4-9.3c-0.7-0.7-1-1.6-1-2.5c0-1,0.4-1.8,1-2.5c1.4-1.4,3.6-1.4,5,0l5.8,5.7
                    c0.1,0.1,0.2,0.1,0.3,0l5.8-5.7c1.4-1.4,3.6-1.4,5,0c0.7,0.7,1,1.6,1,2.5c0,1-0.4,1.8-1,2.5l-9.4,9.3C17.1,24.8,16.6,25,16,25z" />
                  </g>
                </svg>
              </div>

            <div className='hover:bg-slate-300 rounded-2xl mr-1' onClick={() => {
              if(participateState){
                handledelete(index);
              }else{
                alert("Please first participate the activity !");
              }
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 9L13.0001 11.9999M13.0001 11.9999L10 15M13.0001 11.9999L10.0002 9M13.0001 11.9999L16.0002 15M8 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H8L2 12L8 6Z" stroke="#828582" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            </ListItem>
          )
          )}
          </List>

          {location.length === 0 && <p className='flex justify-center'>go add some schedule !</p>}

          <style>{`
          ::-webkit-scrollbar {
            width: 0;  /* Remove scrollbar width */
          }

          ::-webkit-scrollbar-thumb {
            background-color: transparent;  /* Make scrollbar thumb transparent */
          }
        `}</style>
      </div>
    </>
  );
}

export default ScheduleList;