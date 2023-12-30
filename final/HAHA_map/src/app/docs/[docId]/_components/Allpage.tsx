"use client"
import MapComponent from "./map";
import type { Activity_detial } from "@/lib/types/db";
import { useEffect } from "react";
import { useActivity } from "@/hooks/useActivity";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ScheduleList from "./ScheduleList";
import AddScheduleDialog from "./AddScheduleDialog";
import ShareDialog from "./ShareDialog";
import { useSession } from "next-auth/react";
import { publicEnv } from "@/lib/env/public";
import DescriptionDialog from "./DescriptionDialog";

type memberType = {
  displayId: string;
  username: string;
  email: string;
}

type inputType = {
  activity: Activity_detial | undefined;
  members: memberType[];
}

function AllPage({activity, members}: inputType) {
  const {data: session} = useSession();
  const { docId } = useParams();
  const activityId = Array.isArray(docId) ? docId[0] : docId;
  const router = useRouter();
  const {membersState, updateLocation,postSchedule,location, setDes, setLoca, setDateE, setDateS, setMem, setSchLoca, setSchName, scheduleLocation, scheduleName, dateStart, dateEnd, addMemId, deleteMemId, description} = useActivity();
  const [participateState, setParticipateState] = useState<boolean>(false);
  useEffect(() => {
    console.log("useEffect");
    console.log(activity);
    console.log("end");
    if(activity){
      setDes(activity.description);
      setLoca(activity.location);
      setDateE(activity.dateEnd);
      setDateS(activity.dateStart);
      setSchLoca(activity.schedule_location);
      setSchName(activity.schedule_name);
    }
    setMem(members);
    console.log("MEMBER!!!")
    console.log(members);
    let temp:boolean = false;
    for(let i = 0; i < members.length; i++){
      if(members[i].displayId === session?.user?.id){
        temp = true;
      }
    }
    setParticipateState(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity, members]);

  console.log("allPageMember");
  console.log(membersState);
  const toggleParticipate = () => {
    if(participateState === false){
      if(!session?.user?.id){
        router.push(publicEnv.NEXT_PUBLIC_BASE_URL);
      }else{
        addMemId(session?.user?.id);
        setParticipateState(true);
      }
    }else{
      if(!session?.user?.id){
        router.push(publicEnv.NEXT_PUBLIC_BASE_URL);
      }else{
        deleteMemId(session?.user?.id);
        setParticipateState(false);
      }
    }
    router.refresh();
  };
  console.log("Location");
  console.log(location);
  // const forSchInput = {setName:setSchName, setSchLoca:setSchLoca, location:location, save:save, schLoca:scheduleLocation};

  return (
    <>
      <div className="container ml-3 mr-3">
        <div className="grid grid-cols-7">
          
          <div className="flex flex-col align-top col-span-4">
            <div style={{height: "70vh"}} className="w-1/2">
              <p className="text-2xl font-bold py-3">{activity?.title}</p>
              <MapComponent
                location={location}
                setLoca={setLoca}
                saveLoca={updateLocation}
              />
            </div>
          </div>

          <div className="mt-4 col-span-3 mb-2">

            <div className="flex justify-around py-2 bg-slate-200 rounded-lg">

              {/* Chatroom */}
              <svg width="36" height="36" 
                onClick={() => {
                  if(participateState){
                    router.push(`${activityId}/chat`);
                  }else{
                    alert("Please first participate the activity !!");
                  }
                }}
                className="hover:bg-slate-300 rounded-2xl"
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 13.7596 1.41318 15.4228 2.14781 16.8977C2.34303 17.2897 2.40801 17.7377 2.29483 18.1607L1.63966 20.6093C1.35525 21.6723 2.32772 22.6447 3.39068 22.3603L5.83932 21.7052C6.26233 21.592 6.71033 21.657 7.10228 21.8522C8.5772 22.5868 10.2404 23 12 23Z" fill="#6d7694"/>
                  <path d="M10.9 12.0004C10.9 12.6079 11.3925 13.1004 12 13.1004C12.6075 13.1004 13.1 12.6079 13.1 12.0004C13.1 11.3929 12.6075 10.9004 12 10.9004C11.3925 10.9004 10.9 11.3929 10.9 12.0004Z" fill="#1C274C"/>
                  <path d="M6.5 12.0004C6.5 12.6079 6.99249 13.1004 7.6 13.1004C8.20751 13.1004 8.7 12.6079 8.7 12.0004C8.7 11.3929 8.20751 10.9004 7.6 10.9004C6.99249 10.9004 6.5 11.3929 6.5 12.0004Z" fill="#1C274C"/>
                  <path d="M15.3 12.0004C15.3 12.6079 15.7925 13.1004 16.4 13.1004C17.0075 13.1004 17.5 12.6079 17.5 12.0004C17.5 11.3929 17.0075 10.9004 16.4 10.9004C15.7925 10.9004 15.3 11.3929 15.3 12.0004Z" fill="#1C274C"/>
              </svg>

              {/* participate */}
              <svg width="36" height="36" 
                onClick={toggleParticipate}
                className="hover:bg-slate-300 rounded-2xl"
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" fill={`${participateState ? "#2bf016" : "#6d7694"}`}/>
                  <path d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#1C274C"/>
              </svg>

              <ShareDialog 
                membersState={membersState}
                docId={activityId} 
                participateState={participateState}
              />

              <DescriptionDialog
                actDescirption={description}
              />
              

            </div>

            <div className="flex justify-center mt-5 bg-slate-200 rounded-lg">
              <div className="mr-5">
                <p className="font-semibold text-md">
                  Start Date：
                </p>
                <p className="font-normal text-md text-slate-500">{dateStart}</p>
              </div>
              
              <div className="ml-8">
                <p className="font-semibold text-md">
                  End Date：
                </p>
                <p className="font-normal text-md text-slate-500">{dateEnd}</p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <p className="ml-5 font-semibold text-xl">
                Schedule
              </p>

              <AddScheduleDialog 
                setName={setSchName}
                setSchLoca={setSchLoca}
                location={location}
                save={postSchedule}
                schLoca={scheduleLocation}
                schName = {scheduleName}
                participateState = {participateState}
              />
            </div>
            
            <ScheduleList 
              setLoca = {setLoca}
              name = {scheduleName}
              location = {scheduleLocation}
              participateState = {participateState}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllPage;
