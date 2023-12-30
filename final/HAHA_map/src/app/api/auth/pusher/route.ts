import { type NextRequest, NextResponse } from "next/server";

// import { and, eq } from "drizzle-orm";

// import { db } from "@/db";
// import { usersToActivitiesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher/server";

export async function POST(request: NextRequest) {
  try {
    console.log("inPusherApi");
    console.log("inPusherApi");
    console.log("inPusherApi");
    console.log("inPusherApi");
    const session = await auth();
    console.log(session);
    if (!session?.user?.email || !session?.user?.id) {
      console.log("DDDDDEAAAAD");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.formData();
    const socketId = data.get("socket_id") as string;
    const channel = data.get("channel_name") as string;

    // channel name is in the format: private-<docId>
    const docId = channel.slice(8);
    if (!docId) {
      return NextResponse.json(
        { error: "Invalid channel name" },
        { status: 400 },
      );
    }
    console.log("IPAASSED");
    // Get the document from the database
    // const docOwnership = await db.query.usersToActivitiesTable.findFirst({
    //   where:
    //     and(
    //       eq(usersToActivitiesTable.userId, session.user.id),
    //       eq(usersToActivitiesTable.activityId, docId),
    //     ),
    //   columns: {
    //     userId: true,
    //     activityId: true,
    //     id: true,
    //   }
    // })
      
    // if (!docOwnership) {
    //   console.log("NOOOO")
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const userData = {
      user_id: session.user.email,
    };

    const authResponse = pusherServer.authorizeChannel(
      socketId,
      channel,
      userData,
    );

    return NextResponse.json(authResponse);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
      },
    );
  }
}
