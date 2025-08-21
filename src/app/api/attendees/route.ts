import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Attendee {
  id: number | undefined;
  name: string;
  email: string;
  company: string;
  role: string;
  dietaryNeeds: string | null;
  eventId: number | undefined;
}

/**
 * Handles the GET request to fetch all attendees.
 * @returns {NextResponse} A JSON response with the list of attendees.
 */
export async function GET() {
  try {
    const attendees: Attendee[] = await db.attendee.findMany();

    return NextResponse.json(attendees, { status: 200 });
  } catch (error) {
    console.error("GET Attendees API Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}

/**
 * Handles the DELETE request to remove an attendee.
 * @param {NextRequest} request The incoming request object.
 * @returns {NextResponse} A JSON response indicating success or failure.
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Attendee ID is required." },
        { status: 400 },
      );
    }

    const attendeeId = parseInt(id, 10);

    if (isNaN(attendeeId)) {
      return NextResponse.json(
        { message: "Invalid Attendee ID." },
        { status: 400 },
      );
    }

    await db.attendee.delete({
      where: { id: attendeeId },
    });

    return NextResponse.json(
      { message: "Attendee deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE Attendee API Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}

/**
 * Handles the POST request for event registration.
 * This function receives attendee data from the registration form,
 * validates it, and saves it to the in-memory store.
 *
 * @param {NextRequest} request The incoming request object, containing the form data.
 * @returns {NextResponse} A JSON response indicating success or failure.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role, diet } = body;

    if (!name || !email || !company || !role) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    const newAttendee: Attendee = await db.attendee.create({
      data: {
        name,
        email,
        company,
        role,
        dietaryNeeds: diet || null,
        eventId: 3,
      },
    });

    console.log("New Registration Received and Stored:", newAttendee);

    return NextResponse.json(
      { message: "Registration successful!", data: newAttendee },
      { status: 201 },
    );
    //eslint-disable-next-line
  } catch (error: any) {
    console.error("POST Attendee API Error:", error);

    // Handle unique constraint violation for email
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return NextResponse.json(
        { message: "El correo electrónico ya está registrado." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}
