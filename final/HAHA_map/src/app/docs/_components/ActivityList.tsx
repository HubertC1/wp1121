"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {useList} from "@/hooks/useList";
import { AiFillDelete } from "react-icons/ai";

type activityType = {
  displayId: string;
  title: string;
}

type ActivityListProps = {
  allActivities : activityType[];
  myActivities : activityType[];
  activityID: string;
}
  
  
export function ActivityList({allActivities, myActivities, activityID} : ActivityListProps){
  
  const {setAll, setMy, allActivity, deleteActivity} = useList();
  useEffect(() => {
    setAll(allActivities);
    setMy(myActivities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allActivities, myActivities])

  const [mine, setMine] = useState<boolean>(true);
  const [text, setText] = useState(''); 
  const [myButtonText, setMyButtonText] = useState<string>('Only show my activities');

  function handleMyClick() {
    setMine(!mine);

    if (mine) {
      setMyButtonText('Show all activities');
    } else {
      setMyButtonText('Only show my activities');
    }
  }


  const myActivityIds = myActivities.map(doc => doc.displayId);

  const filteredDocuments = allActivities.filter(doc =>
    doc.title.toLowerCase().includes(text.toLowerCase())
  );

  const renderCount = filteredDocuments.length;

  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const handleActivityClick = (displayId: string) => {
    setSelectedActivity(displayId);
  };

    return (
        <>
          <section className="flex justify-between items-center">
            <div className="absolute w-3/12 h-9 mt-5 bg-slate-100 bg-opacity-100 "/>

            <button
              onClick={() => {handleMyClick()}}
              className={`flex items-center absolute h-7 w-3/12 mt-3 px-3 text-left text-sm text-slate-500 hover:bg-slate-200 `}
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" fill={(myButtonText === 'Show all activities') ? "#05fa26" : "#6d7694"}/>
                  <path d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#1C274C"/>
              </svg>
              <p className="ml-3">{myButtonText}</p> 
            </button>

              <div className="absolute w-3/12 h-11 mt-24 py-1 bg-slate-100 bg-opacity-100"/>
              
              <Input
                placeholder="search activity ..."
                value={text}
                onChange={(e) => {setText(e.target.value)}}
                className="absolute w-1/5 pl-10 mt-24 ml-2 py-1 bg-gray-300 border rounded-xl hover:bg-gray-200 opacity-100"
                />

              <svg width="24" height="24" className="absolute mt-24 ml-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1003.8 775.3l-639.5 1.8L682.7 355z" fill="#B6CDEF" />
                  <path d="M364.3 792.1c-5.7 0-10.9-3.2-13.4-8.3-2.5-5.1-2-11.2 1.4-15.7L670.7 346c2.8-3.7 7.2-6 11.9-6s9.1 2.2 11.9 5.9l321.1 420.4c3.5 4.5 4.1 10.6 1.5 15.7-2.5 5.1-7.7 8.4-13.4 8.4l-639.4 1.7c0.1 0 0.1 0 0 0z m318.5-412.3L394.5 762l579-1.6-290.7-380.6z" fill="#0F53A8" />
                  <path d="M1003.8 775.3l-152.1 0.5-169-420.8z" fill="#89B7F5" />
                  <path d="M851.7 790.8c-6.1 0-11.6-3.7-13.9-9.4l-169-420.8c-2.8-7 0-14.9 6.5-18.6 6.5-3.7 14.8-2 19.3 3.9l321.1 420.4c3.5 4.5 4.1 10.6 1.5 15.7-2.5 5.1-7.7 8.4-13.4 8.4l-152.1 0.4z m-114-339.1l124.1 309 111.7-0.3-235.8-308.7z" fill="#0F53A8" />
                  <path d="M761.5 774.8l-740.9 2 368.7-542.3z" fill="#B6CDEF" />
                  <path d="M20.6 791.8c-5.5 0-10.6-3.1-13.2-8-2.6-4.9-2.3-10.9 0.8-15.5L376.9 226c2.8-4.1 7.4-6.6 12.4-6.6 4.9 0 9.6 2.4 12.4 6.5l372.2 540.3c3.2 4.6 3.5 10.5 0.9 15.5-2.6 4.9-7.7 8-13.2 8l-741 2.1z m368.8-530.7L49 761.7l684-1.8-343.6-498.8z" fill="#0F53A8" />
                  <path d="M761.5 774.8l-271.7 2-100.5-542.3z" fill="#89B7F5" />
                  <path d="M489.8 791.8c-7.2 0-13.4-5.2-14.7-12.3L374.5 237.2c-1.3-7 2.5-13.9 9-16.6 6.5-2.7 14.1-0.5 18.1 5.3l372.2 540.3c3.2 4.6 3.5 10.5 1 15.4-2.6 4.9-7.6 8-13.2 8.1l-271.7 2c0 0.1-0.1 0.1-0.1 0.1zM416.9 301l85.4 460.7 230.8-1.7-316.2-459z" fill="#0F53A8" />
              </svg>  

          </section>


      <section className="flex w-full flex-col pt-3 mt-16 px-1">
        {allActivity.map((doc, i) => {
            if (doc.title.includes(text)) {
              if (mine)
                {return (
                  <div
                    key={i}
                    onClick={() => handleActivityClick(doc.displayId)}
                    className={`group w-full cursor-pointer flex items-center justify-between gap-2 rounded-2xl text-slate-400 hover:bg-slate-200 ${
                      selectedActivity === doc.displayId ? 'bg-gray-300' :''
                    }`}
                  >
                    <Link
                      className="grow px-3 py-1 flex items-center"
                      href={`/docs/${doc.displayId}`}
                    >
                      <div className={`flex items-center gap-2 ${doc.displayId === activityID ? 'bg-blue-500' : ''}`}>
                        <svg className="flex items-center mb-3" width="40px" height="40px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
                          <path fill="#2f2f2f" d="M85.97 62.07L68.2 117.71l9.91 2.45l21.26-1.29l-1.03-35.93z"></path>
                          <path d="M35.74 44.29c-1.32.99-4.51 12.37-12.24 27.95s-17.65 36.2-17.65 36.2s1.16 1.67 15.84 6.96s26.81 7.61 26.81 7.61s32.7-50.9 32.96-52.05c.26-1.16 5.48-22.38 5.48-22.38s-20.81-1.45-29.83-2.22s-19.83-3.23-21.37-2.07z" fill="#f19f40"></path>
                          <path d="M110.4 118.76l10.98-1.87s-10.13-21.19-15.67-31.88s-15.1-33.38-16-35.05s-4.64-2.45-6.31.52s-15.61 33.56-18.23 38.45c-2.95 5.5-17.61 32.59-17.74 34.01c-.13 1.42 24.68-.93 24.68-.93l6.4-18.85l7.73-33.49l1.29.26l6.18 27.31l16.69 21.52z" fill="#ec5f32"></path>
                          <path d="M79.33 121.12c-.22 1.3-6.76 2.43-10.48 2.51c-3.73.09-10.4.35-11.18-.52c-.78-.87 8.4-9.01 14.3-19.67c5.89-10.66 9.36-18.02 10.22-20.97c.87-2.95 2.6-11.78 3.29-13.26s2.08-1.21 2.51.17c.43 1.39 4.94 18.46 6.5 22.53c1.56 4.07 7.97 12.56 9.88 15.25c1.91 2.69 11.35 9.85 11.52 10.54c.17.69-5.84 2.8-9.93 3.27c-2.93.33-9.76-.18-10.28-1.05c-.52-.87-4.05-23.94-5.35-31.65c-1.3-7.71-3.55-18.02-3.55-18.02s-5.11 24.78-5.81 31.37c-.69 6.59-1.3 17.42-1.64 19.5z" fill="#9c2d1b"></path>
                          <path d="M4.2 98.52s.73-.76 2.11-.85c1.38-.08 2.6.76 2.6.76l.89 12.82s-1.06.93-2.36.93s-2.52-.68-2.52-.68L4.2 98.52z" fill="#9c2d1b"></path>
                          <path d="M41.46 111.41s1.13-.95 2.86-.95s3.03.87 3.03.87l.09 13s-1.39.78-2.43.78c-1.04 0-2.69-.52-2.69-.52l-.86-13.18z" fill="#9c2d1b"></path>
                          <path d="M119 105.7s.93-1.08 2.58-1s2.55.65 2.55.65l-.78 13.34s-.61.87-2.08.87s-2.77-.69-2.77-.69l.5-13.17z" fill="#9c2d1b"></path>
                        </svg>

                        <div className="grid grid-row-2">
                          <span className="text-md font-semibold text-black">
                            {doc.title}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="hidden mr-5 text-slate-400 hover:text-red-400 group-hover:flex" onClick= {()=>deleteActivity(doc.displayId)}>
                      <AiFillDelete size={20}/>
                    </div>

                    {(myActivityIds.includes(doc.displayId)) && 
                      <svg width="22" height="22" viewBox="0 0 24 24" 
                      className="mr-4"
                      fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.5" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" fill="#05fa26"/>
                          <path d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#1C274C"/>
                      </svg>
                      }             
                  </div>
                );}
              else{
                return (
                  <>
                    {
                      myActivityIds.includes(doc.displayId) && 
                      <div
                        key={i}
                        onClick={() => handleActivityClick(doc.displayId)}
                        className={`group w-full cursor-pointer flex items-center justify-between gap-2 text-slate-400 rounded-2xl hover:bg-slate-200 ${
                          selectedActivity === doc.displayId ? 'bg-gray-300' : ''
                        }`}
                      >
                        <Link
                          className="grow px-3 py-1"
                          href={`/docs/${doc.displayId}`}
                        >
                          <div className="flex items-center gap-2">
                            <svg width="40px" height="40px" className="mb-3" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
                              <path fill="#2f2f2f" d="M85.97 62.07L68.2 117.71l9.91 2.45l21.26-1.29l-1.03-35.93z"></path>
                              <path d="M35.74 44.29c-1.32.99-4.51 12.37-12.24 27.95s-17.65 36.2-17.65 36.2s1.16 1.67 15.84 6.96s26.81 7.61 26.81 7.61s32.7-50.9 32.96-52.05c.26-1.16 5.48-22.38 5.48-22.38s-20.81-1.45-29.83-2.22s-19.83-3.23-21.37-2.07z" fill="#f19f40"></path>
                              <path d="M110.4 118.76l10.98-1.87s-10.13-21.19-15.67-31.88s-15.1-33.38-16-35.05s-4.64-2.45-6.31.52s-15.61 33.56-18.23 38.45c-2.95 5.5-17.61 32.59-17.74 34.01c-.13 1.42 24.68-.93 24.68-.93l6.4-18.85l7.73-33.49l1.29.26l6.18 27.31l16.69 21.52z" fill="#ec5f32"></path>
                              <path d="M79.33 121.12c-.22 1.3-6.76 2.43-10.48 2.51c-3.73.09-10.4.35-11.18-.52c-.78-.87 8.4-9.01 14.3-19.67c5.89-10.66 9.36-18.02 10.22-20.97c.87-2.95 2.6-11.78 3.29-13.26s2.08-1.21 2.51.17c.43 1.39 4.94 18.46 6.5 22.53c1.56 4.07 7.97 12.56 9.88 15.25c1.91 2.69 11.35 9.85 11.52 10.54c.17.69-5.84 2.8-9.93 3.27c-2.93.33-9.76-.18-10.28-1.05c-.52-.87-4.05-23.94-5.35-31.65c-1.3-7.71-3.55-18.02-3.55-18.02s-5.11 24.78-5.81 31.37c-.69 6.59-1.3 17.42-1.64 19.5z" fill="#9c2d1b"></path>
                              <path d="M4.2 98.52s.73-.76 2.11-.85c1.38-.08 2.6.76 2.6.76l.89 12.82s-1.06.93-2.36.93s-2.52-.68-2.52-.68L4.2 98.52z" fill="#9c2d1b"></path>
                              <path d="M41.46 111.41s1.13-.95 2.86-.95s3.03.87 3.03.87l.09 13s-1.39.78-2.43.78c-1.04 0-2.69-.52-2.69-.52l-.86-13.18z" fill="#9c2d1b"></path>
                              <path d="M119 105.7s.93-1.08 2.58-1s2.55.65 2.55.65l-.78 13.34s-.61.87-2.08.87s-2.77-.69-2.77-.69l.5-13.17z" fill="#9c2d1b"></path>
                            </svg>
                            <div className="grid grid-row-2">
                              <span className="text-md font-semibold text-black">
                                {doc.title}
                              </span>
                            </div>
                          </div>
                        </Link>   
    
                      {(myActivityIds.includes(doc.displayId)) && 
                      <svg width="22" height="22" viewBox="0 0 24 24" 
                      className="mr-4"
                      fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.5" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" fill="#05fa26"/>
                          <path d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#1C274C"/>
                      </svg>}             
                    </div>
                    }
                  </>
                );
              }
            }
          }
          )}



        {(renderCount == 0) && 
        <div className="flex flex-col">
          <p className="flex justify-center">no activity found</p>
          <p className="flex justify-center">create it from button above</p>
        </div>}

      </section>
      </>
    );
}
  
  export default ActivityList;