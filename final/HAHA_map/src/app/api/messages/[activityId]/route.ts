import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";
import Pusher from "pusher";
import type { z } from "zod";

import { db } from "@/db";
import { activitiesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";
import { editMessageSchema } from "@/validators/updateActivity";
// import type { Activity_message } from "@/lib/types/db";

// GET /api/documents/:documentId
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      activityId: string;
    };
  },
) {
  try {
    // Get user from session
    // const session = await auth();
    // if (!session || !session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // const userId = session.user.id;

    // Get the document
    const dbDocument = await db.query.activitiesTable.findFirst({
      where: and(
        eq(activitiesTable.displayId, params.activityId),
      ),
      columns: {
        displayId: true,
        messages_content: true,
        messages_senderId: true,
        messages_senderName: true,
      },
      },);
    console.log(params.activityId);
    if (!dbDocument) {
      return NextResponse.json({ error: "Doc Not Found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        displayId: dbDocument.displayId,
        messages_content: dbDocument.messages_content,
        messages_senderId: dbDocument.messages_senderId,
        messages_senderName: dbDocument.messages_senderName,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

// PUT /api/documents/:documentId
export async function PUT(
  req: NextRequest,
  { params }: { params: { activityId: string } },
) {
  try {
    // Get user from session
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // Check ownership of document
    // const [doc] = await db
    //   .select({
    //     displayId: activitiesTable.displayId,
    //   })
    //   .from(activitiesTable)
    //   .where(
    //       eq(activitiesTable.displayId, params.activityId),
    //   );
    // if (!doc) {
    //   return NextResponse.json({ error: "Doc Not Found" }, { status: 404 });
    // }

    // Parse the request body

    type editMessageType = z.infer<typeof editMessageSchema>
    const data = await req.json();
    try {
      editMessageSchema.parse(data);
    } catch (error) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
  
    // Destructure the validated data
    const { messages_content, messages_senderId, messages_senderName } = data as editMessageType;

    const validatedReqBody: editMessageType = {};
    if(messages_content !== undefined){validatedReqBody.messages_content = messages_content}
    if(messages_senderId !== undefined){validatedReqBody.messages_senderId = messages_senderId}
    if(messages_senderName !== undefined){validatedReqBody.messages_senderName = messages_senderName}

    console.log('here1');
    console.log(validatedReqBody);
    console.log(params.activityId);

    // Update document
    const [updatedDoc] = await db
      .update(activitiesTable)
      .set(validatedReqBody)
      .where(eq(activitiesTable.displayId, params.activityId))
      .returning();

    // console.log("here2");
    // console.log(updatedDoc);

    // Trigger pusher event
    const pusher = new Pusher({
      appId: privateEnv.PUSHER_ID,
      key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
      secret: privateEnv.PUSHER_SECRET,
      cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
      useTLS: true,
    });

    // Private channels are in the format: private-...
    await pusher.trigger(`private-${updatedDoc.displayId}`, "doc:update", {
    // await pusher.trigger(`private-haha`, "doc:update", {
      senderId: userId,
      messages: {
        displayId: updatedDoc.displayId,
        messages_content: updatedDoc.messages_content,
        messages_senderId: updatedDoc.messages_senderId,
        messages_senderName: updatedDoc.messages_senderName,
      },
    });

    return NextResponse.json(
      {
        displayId: updatedDoc.displayId,
        messages_content: updatedDoc.messages_content,
        messages_senderId: updatedDoc.messages_senderId,
        messages_senderName: updatedDoc.messages_senderName,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
