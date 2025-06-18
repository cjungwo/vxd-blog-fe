import { CreateUserDto, User } from "@/entities";
import { generateId, ResponseDto } from "@/shared";
import bcrypt from "bcryptjs";
import { prisma } from "@/shared";
import { Prisma } from "@/generated/prisma";


export async function createUser(dto: CreateUserDto) {
  const { name, email, password } = dto;

  // Validation Guard
  if (!name.trim() || !email.trim() || !password.trim()) {
    return {
      status: 400,
      data: {
        message: "Invalid user data",
      }
    } as ResponseDto;
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    return {
      status: 400,
      data: {
        message: "User already exists",
      }
    } as ResponseDto;
  }

  // Business Logic
  const hash = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: generateId("U"),
    name,
    email,
    hash,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const createdUser: Prisma.UserCreateInput = await prisma.user.create({ data: newUser });

  if (!createdUser) {
    return {
      status: 400,
      data: {
        message: "Failed to create user",
      }
    } as ResponseDto;
  }

  // Create Response
  const result: ResponseDto = {
      status: 201,
      data: {
          user: createdUser,
      }
  };

  // Return Response
  return result;
}
