import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const users = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  if (!users) {
    return new NextResponse("No users with ID found", { status: 404 });
  }

  return NextResponse.json(users);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let json = await request.json();

  const updated_user = await prisma.users.update({
    where: { id },
    data: json,
  });

  if (!updated_user) {
    return new NextResponse("No users with ID found", { status: 404 });
  }

  return NextResponse.json(updated_user);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.users.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return new NextResponse("No users with ID found", { status: 404 });
    }

    return new NextResponse(error.message, { status: 500 });
  }
}
