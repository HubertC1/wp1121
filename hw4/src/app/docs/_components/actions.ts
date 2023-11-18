import { eq, ne, and } from "drizzle-orm";

import { db } from "@/db";
import { documentsTable, usersTable, usersToDocumentsTable } from "@/db/schema";
import { notEqual } from "assert";

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

export const getReceiver = async (documentId: string, userId: string) =>{
  "use server";
  const chatBox = await db.query.usersToDocumentsTable.findFirst({
    where: and(eq(usersToDocumentsTable.documentId, documentId) ,ne(usersToDocumentsTable.userId, userId)),
  });
  const receiver = await db.query.usersTable.findFirst({
    where: eq(usersTable.displayId, chatBox!.userId),
  })
  return receiver!.username;
}

export const checkAccount = async (email: string) =>{
  "use server";
  const [user] = await db
    .select({
      id: usersTable.id,
      displayId: usersTable.displayId,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .execute();
  return (Boolean(user)===true)?user.displayId:false;
}

export const checkChatbox = async (sender: string, receiver: string) => {
  "use server"
  const docForSender = await db
    .select({documentId: usersToDocumentsTable.documentId})
    .from(usersToDocumentsTable)
    .where(eq(usersToDocumentsTable.userId, sender))
    .execute();
  const docForReceiver = await db
    .select({documentId: usersToDocumentsTable.documentId})
    .from(usersToDocumentsTable)
    .where(eq(usersToDocumentsTable.userId, receiver))
    .execute();
  const common = docForSender.filter(({documentId})=>
    docForReceiver.some(doc => doc.documentId === documentId)
  );

  return common.length > 0;
}