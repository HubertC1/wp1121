import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { usersTable, usersToActivitiesTable } from "@/db/schema";
// import { useTransition } from "react";
import { eq, and } from "drizzle-orm";

// Define the schema for the request data
const addUserToActivityRequestSchema = z.object({
  userId: z.string().uuid().optional(),
  userEmail: z.string().optional(),
  activityId: z.string().uuid(),
});

// Infer the TypeScript type from the zod schema
type AddUserToActivityRequest = z.infer<typeof addUserToActivityRequestSchema>;

// POST method to handle adding a user to an activity
export async function POST(
    request: NextRequest,
    ) {
  const data = await request.json();

  // Validate the incoming request data
  let validatedData: AddUserToActivityRequest;
  try {
    // eslint-disable-next-line
    validatedData = addUserToActivityRequestSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    // Generic error fallback
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // const { userId, activityId } = validatedData;

  // Insert the association into the 'users_to_activities' table
  try {
    if(validatedData.userId){
      await db.insert(usersToActivitiesTable).values({
        userId: validatedData.userId,
        activityId: validatedData.activityId,
      });
    }else if(validatedData.userEmail){
      const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.email, validatedData.userEmail),
        columns: {
          displayId: true,
        }
      })
      if(user){
        await db.insert(usersToActivitiesTable).values({
          userId: user.displayId,
          activityId: validatedData.activityId,
        });
      }else{
        return NextResponse.json({ message: false }, { status: 200 });
      }
    }

    return NextResponse.json({ message: true }, { status: 200 });
  } catch (error) {
    // Handle any errors during the database insert
    // Ideally, log the error and return a generic error message to the client
    console.error(error);
    return NextResponse.json({ error: "Failed to add user to activity" }, { status: 500 });
  }
}

// Define the schema for the request data
const deleteUserToActivityRequestSchema = z.object({
  userId: z.string().uuid(),
  activityId: z.string().uuid(),
});

// Infer the TypeScript type from the zod schema
type deleteUserToActivityRequest = z.infer<typeof deleteUserToActivityRequestSchema>;

export async function DELETE(
  request: NextRequest,
  ) {
const data = await request.json();

// Validate the incoming request data
let validatedData: deleteUserToActivityRequest;
try {
  // eslint-disable-next-line
  validatedData = deleteUserToActivityRequestSchema.parse(data);
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ errors: error.errors }, { status: 400 });
  }
  // Generic error fallback
  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

// const { userId, activityId } = validatedData;

// Insert the association into the 'users_to_activities' table
try {
  if(validatedData.userId){
    await db.delete(usersToActivitiesTable).where(
    and(
      eq(usersToActivitiesTable.userId, validatedData.userId),
      eq(usersToActivitiesTable.activityId, validatedData.activityId)
    ));
  }

  return NextResponse.json({ message: true }, { status: 200 });
} catch (error) {
  // Handle any errors during the database insert
  // Ideally, log the error and return a generic error message to the client
  console.error(error);
  return NextResponse.json({ error: "Failed to add user to activity" }, { status: 500 });
}
}

