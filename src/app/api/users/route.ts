import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const users = await prisma.users.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const users = await prisma.users.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(users), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("User with email already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}
