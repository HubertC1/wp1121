import { eq } from "drizzle-orm";

import {z} from "zod";

import { db } from "@/db";
import { documentsTable, usersToDocumentsTable, usersToActivitiesTable, activitiesTable } from "@/db/schema";

//  export type createActivityInput = {
//   title: string;
//   description: string;
//   dateStart: string;
//   dateEnd: string;
//   organizerId: string;
//  }

export const createDocument = async (userId: string) => {
  "use server";
  console.log("[createDocument]");

  const newDocId = await db.transaction(async (tx) => {
    const [newDoc] = await tx
      .insert(documentsTable)
      .values({
        title: "New Document",
        content: "This is a new document",
      })
      .returning();
    await tx.insert(usersToDocumentsTable).values({
      userId: userId,
      documentId: newDoc.displayId,
    });
    return newDoc.displayId;
  });
  return newDocId;
};

export const getDocuments = async (userId: string) => {
  "use server";

  const documents = await db.query.usersToDocumentsTable.findMany({
    where: eq(usersToDocumentsTable.userId, userId),
    with: {
      document: {
        columns: {
          displayId: true,
          title: true,
        },
      },
    },
  });
  return documents;
};

export const deleteDocument = async (documentId: string) => {
  "use server";
  console.log("[deleteDocument]");
  await db
    .delete(documentsTable)
    .where(eq(documentsTable.displayId, documentId));
  return;
};

export const getAllActivities  = async () => {
  "use server";
  console.log("getAllActivities");
  const activities = await db.query.activitiesTable.findMany({
    columns: {
      displayId: true,
      title: true,
    }
  })

  return activities;
}

export const getMyActivities = async (userId: string) => {
  "use server";
  console.log("getMyActivities");
  const activities_temp = await db.query.usersToActivitiesTable.findMany({
    where: eq(usersToActivitiesTable.userId, userId),
    with: {
      activity: {
        columns: {
          displayId: true,
          title: true,
        }
      }
    }
  })
  const activities:{title: string, displayId: string}[] = [];
  for(let i = 0; i < activities_temp.length; i++){
    activities.push(activities_temp[i].activity);
  }

  return activities;
}

const createActivityRequestSchema = z.object({
  title: z.string().min(1).max(30),
  description: z.string().min(10).max(300),
  dateStart: z.string(),
  dateEnd: z.string(),
  organizerId: z.string(),
});

// you can use z.infer to get the typescript type from a zod schema
type createActivityRequest = z.infer<typeof createActivityRequestSchema>;

export const createActivity = async ({title, description, dateStart, dateEnd, organizerId}: createActivityRequest) => {
  "use server";
  console.log("createActivity");
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
    .returning()
    );
  if(!newActivity){
    return false;
  }

  await db.insert(usersToActivitiesTable).values({
    userId: organizerId,
    activityId: newActivity.displayId
  })
  
  return newActivity
}