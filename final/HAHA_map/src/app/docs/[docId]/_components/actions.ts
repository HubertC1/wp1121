import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable, usersToDocumentsTable, activitiesTable, usersToActivitiesTable } from "@/db/schema";

type memberType = {
  displayId: string;
  username: string;
  email: string;
}

export async function getDocumentAuthors(docId: string) {
  const dbAuthors = await db.query.usersToDocumentsTable.findMany({
    where: eq(usersToDocumentsTable.documentId, docId),
    with: {
      user: {
        columns: {
          displayId: true,
          username: true,
          email: true,
        },
      },
    },
    columns: {},
  });

  const authors = dbAuthors.map((dbAuthor) => {
    const author = dbAuthor.user;
    return {
      id: author.displayId,
      username: author.username,
      email: author.email,
    };
  });

  return authors;
}

export const addDocumentAuthor = async (docId: string, email: string) => {
  // Find the user by email
  const [user] = await db
    .select({
      displayId: usersTable.displayId,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (!user) {
    return false;
  }

  await db.insert(usersToDocumentsTable).values({
    documentId: docId,
    userId: user.displayId,
  });
};

export const getActivityDetial = async (actId: string) => {
  const activity = await db.query.activitiesTable.findFirst({
    where: eq(activitiesTable.displayId, actId),
    columns: {
      displayId: true,
      title: true,
      description: true,
      location: true,
      dateStart: true,
      dateEnd: true,
      schedule_name: true,
      schedule_location: true,
    }
  })
  if(activity){
    return activity;
  }
}

export const getActivityMembers =async (actId: string) => {
  const members = await db.query.usersToActivitiesTable.findMany({
    where: eq(usersToActivitiesTable.activityId, actId),
    with: {
      user:{
        columns: {
          displayId: true,
          username: true,
          email: true,
        }
      }
    }
  })

  const result: memberType[] = [];
  for(let i = 0; i < members.length; i++){
    result.push(members[i].user);
  }
  
  return result;
}
