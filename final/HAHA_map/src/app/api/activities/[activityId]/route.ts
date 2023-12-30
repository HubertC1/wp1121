import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { activitiesTable, usersToActivitiesTable } from "@/db/schema";
// import { editLocationSchema } from "@/validators/updateActivity";


const createActivityRequestSchema = z.object({
  title: z.string().min(1).max(30),
  description: z.string().min(10).max(300),
  dateStart: z.string(),
  dateEnd: z.string(),
  organizerId: z.string(),
});

// // you can use z.infer to get the typescript type from a zod schema
type createActivityRequest = z.infer<typeof createActivityRequestSchema>;
 
// export async function GET(
//   request: NextRequest,
//   {params}:{params:{activityId: string}},
//   ){
//     const url = new URL(request.url);
//     const type = url.searchParams.get('type');

//     if (type === 'members'){
//       const members_temp = await db.query.usersToActivitiesTable.findMany({
//         where: eq(usersToActivitiesTable.userId, params.activityId),
//         with: {
//           user:{
//             columns:{
//               displayId: true,
//               username: true,
//               email: true,
//             }
//           }
//         }
//       })
//       const members:{displayId:string, username:string, email:string}[] = [];
//       for (let i = 0; i<members_temp.length; i++){
//         members.push(members_temp[i].user);
//       }
//       return members;
//     }else if (type === 'details'){
//       try {
//         const activityDetails = await db
//           .select()
//           .from(activitiesTable)
//           .where(eq(activitiesTable.displayId,params.activityId))
//           .execute()
//         // If no activity is found, return a 404 response
//         if (activityDetails.length === 0) {
//           return new Response(JSON.stringify({ error: 'Activity not found' }), {
//             status: 404,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
//         }
    
//         // Return the activity details in the response
//         return new Response(JSON.stringify(activityDetails[0]), {
//           status: 200,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//       } catch (error) {
//         // Handle any errors that occur during the database operation
//         console.error(error);
//         return new Response(JSON.stringify({ error: 'Failed to retrieve activity details' }), {
//           status: 500,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//       }
//     }
// }

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    // parse will throw an error if the data doesn't match the schema
    createActivityRequestSchema.parse(data);
  } catch (error) {
    // in case of an error, we return a 400 response
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Now we can safely use the data from the request body
  // the `as` keyword is a type assertion, this tells typescript
  // that we know what we're doing and that the data is of type LikeTweetRequest.
  // This is safe now because we've already validated the data with zod.
  const { title, description, dateStart, dateEnd, organizerId } = data as createActivityRequest;

  try {
    const [newActivity] = (await db
      .insert(activitiesTable)
      .values({
        title,
        description, 
        dateStart,
        dateEnd,
        organizer_id: organizerId,
        schedule_name: [],
        schedule_location: [],
        location: "23.97555/120.97361",
        messages_content: [],
        messages_senderId: [],
        messages_senderName: [],
      })
      .returning());
    await db.insert(usersToActivitiesTable).values({
        userId: organizerId,
        activityId: newActivity.displayId,
    })
  } catch (error) {
    // The NextResponse object is a easy to use API to handle responses.
    // IMHO, it's more concise than the express API.
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}



export async function DELETE(
  request: NextRequest,
  {params}:{params:{activityId:string}},
){
  try{
    await db.delete(activitiesTable).where(
      eq(activitiesTable.displayId, params.activityId),
    );
    return NextResponse.json({ message: true}, {status:200});
  }catch (error){
    return NextResponse.json({error: "Failed to delete activity"}, {status:500});
  }
}
// Define the schema for the activity update request
const updateActivityRequestSchema = z.object({
  // title: z.string().min(1).max(30).optional(),
  description: z.string().optional(),
  dateStart: z.string().optional(),
  dateEnd: z.string().optional(),
  location: z.string().optional(),
  schedule_name: z.array(z.string()).optional(),
  schedule_location: z.array(z.string()).optional(),
});

// Infer the TypeScript type from the zod schema
type UpdateActivityRequest = z.infer<typeof updateActivityRequestSchema>;

export async function PUT(
  request: NextRequest,
  {params}:{params:{activityId: string}},
  ) {
  const data = await request.json();
  // console.log(data);

  // Validate the incoming request data

  try {
    updateActivityRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Destructure the validated data
  const { description, dateStart, dateEnd, location, schedule_name, schedule_location } = data as UpdateActivityRequest;

  // Construct the update payload, excluding undefined values
  const updatePayload: Partial<UpdateActivityRequest> = {};
  // if (title !== undefined) updatePayload.title = title;
  if (description !== undefined) updatePayload.description = description;
  if (dateStart !== undefined) updatePayload.dateStart = dateStart;
  if (dateEnd !== undefined) updatePayload.dateEnd = dateEnd;
  if (location !== undefined) updatePayload.location = location;
  if (schedule_name !== undefined) updatePayload.schedule_name = schedule_name;
  if (schedule_location !== undefined) updatePayload.schedule_location = schedule_location;

  // Perform the update in the database
  try {
    const updatedActivity = await db
      .update(activitiesTable)
      .set(updatePayload)
      .where(eq(activitiesTable.displayId,params.activityId))
      .returning()

    // Check if the activity was successfully updated
    if (updatedActivity.length === 0) {
      return NextResponse.json({ error: "Activity not found or no updates provided" }, { status: 404 });
    }

    return NextResponse.json({ message: "Activity updated successfully", activity: updatedActivity[0] }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update activity" }, { status: 500 });
  }
}