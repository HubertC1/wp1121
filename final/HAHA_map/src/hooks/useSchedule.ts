import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useSchedule(){
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const postSchedule = async({
        name,
        location,
        activityId,
    }:{
        name: string[];
        location: string[],
        activityId: string,
    }) => {
        setLoading(true);
        const res = await fetch(`/api/activities/${activityId}`,{
            method: "PUT",
            body: JSON.stringify({
                schedule_name: name,
                schedule_location: location,
            }),
        });

        if (!res.ok){
            const body = await res.json();
            throw new Error(body.error);
        }
        router.refresh();
        setLoading(false);
    }

    return {
        postSchedule,
        loading,
    }
}
