import { useState } from "react";
import { useRouter } from "next/navigation";
import { publicEnv } from "@/lib/env/public";

type activityType = {
  displayId: string;
  title: string;
}

export const useList = () => {
  const [allActivity, setAllactivity] = useState<activityType[]>([]);
  const [myActivity, setMyActivity] = useState<activityType[]>([]);

  const router = useRouter();
  const setAll = (all: activityType[]) => {
    setAllactivity(all);
  }

  const setMy = (my: activityType[]) => {
    setMyActivity(my);
  }

  const deleteActivity = async(activityId: string) => {
    // alert("deleting");
    const res = await fetch(`/api/activities/${activityId}`,{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activityId: activityId,
      })
    });
    if (!res.ok){
      return;
    }
    router.push(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs`);
    router.refresh();
  }

  const addMembers = async (userId: string, activityId: string) => {
    const res = await fetch(`/api/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        activityId: activityId,
      }),
    });
    if(!res.ok){
      console.log("can't add member to activity");
      return;
    }

    const result = await fetch(`/api/users/${userId}`);
    if(result.ok){
      const data = await result.json();
      setMyActivity(data);
    }
  }

  return{
    allActivity,
    myActivity,
    deleteActivity,
    setAll,
    setMy,
    addMembers,
  }

}