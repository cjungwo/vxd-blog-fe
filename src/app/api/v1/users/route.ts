import { CreateUserDto, users } from "@/entities";
import { createUser } from "@/features";
import { NextRequest } from "next/server";

export async function GET() {
  return Response.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const dto: CreateUserDto = {
    name: body.name,
    email: body.email,
    password: body.password
  }

  const result = await createUser(dto);

  return Response.json(result);
}
