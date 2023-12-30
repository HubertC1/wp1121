import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";


// GET /api/username/:userId
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  },
) {
  try {
    console.log("getUserName");
    // Get user from session

    // Get the document
    console.log(params.userId);
		const senderName = await db.query.usersTable.findFirst({
			where: eq(usersTable.displayId, params.userId),
			columns: {
        username: true,
      }
		})
    console.log(senderName);
    if(!senderName){
      return NextResponse.json({ error: "Doc Not Found" }, { status: 404 });
    }
    console.log("i'm here");
	
    const username = senderName?.username;
		return new NextResponse(JSON.stringify({ username: username }), {
      status: 200,
    });
    } catch (error) {
      console.log(error);
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