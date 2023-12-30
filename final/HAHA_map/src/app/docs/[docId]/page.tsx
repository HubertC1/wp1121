// import MapComponent from "./_components/map";
import { getActivityMembers, getActivityDetial } from "./_components/actions";
import type { Activity_detial } from "@/lib/types/db";
// import type { NextRequest } from 'next/server';
import AllPage from "./_components/Allpage";
// import { auth } from "@/lib/auth";

type memberType = {
  displayId: string;
  username: string;
  email: string;
}

type Props = {
  params: { docId: string };
};

async function DocPage({params}: Props) {
  const activityId = params.docId;
  // console.log("id");
  // console.log(activityId);

  let members: memberType[] = [];
  let activity: Activity_detial | undefined;
  if(activityId){
    members = await getActivityMembers(activityId);
    activity = await getActivityDetial(activityId);
  }

  const temp = {activity: activity, members: members};

  return (

    <>
      <div className="w-full flex">
        <AllPage {...temp}/>
      </div>
    </>
  );
}

export default DocPage;
