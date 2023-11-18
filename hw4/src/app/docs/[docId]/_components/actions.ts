"use server"
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable, usersToDocumentsTable, messagesTable, documentsTable } from "@/db/schema";

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
  console.log("added user");
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

// export const addMessage = async (docId: string, sender: string, content: string) => {
//   const [doc] = await db
//     .select({
//       displayId: documentsTable.displayId,
//     })
//     .from(documentsTable)
//     .where(eq(documentsTable.displayId, docId));
//     if (!doc){
//       return false;
//     }

//     await db.insert(messagesTable).values({

//     });
// };

export const createMessage = async (documentId: string, userId: string, content: string) => {
  // "use server";
  console.log("[createMessage]");

  const newMesId = await db.transaction(async (tx) => {
    const [newMes] = await tx
      .insert(messagesTable)
      .values({
        content: content,
        userId: userId,
        documentId: documentId,
      })
      .returning();
      return newMes.displayId;
  });
  return newMesId;
};

export const deleteMessage = async (messageId: string) => {
  // "use server";
  console.log("[deleteMessage]");
  await db
    .delete(messagesTable)
    .where(eq(messagesTable.displayId, messageId));
  return;
};
// export const createDocument = async (userId: string) => {
//   "use server";
//   console.log("[createDocument]");

//   const newDocId = await db.transaction(async (tx) => {
//     const [newDoc] = await tx
//       .insert(documentsTable)
//       .values({
//         title: "New Document",
//         content: "This is a new document",
//       })
//       .returning();
//     await tx.insert(usersToDocumentsTable).values({
//       userId: userId,
//       documentId: newDoc.displayId,
//     });
//     return newDoc.displayId;
//   });
//   return newDocId;
// };