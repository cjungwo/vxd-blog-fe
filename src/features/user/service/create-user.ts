import { CreateUserDto } from "@/entities";
import { ResponseDto } from "@/shared";
import bcrypt from "bcryptjs";
import { prisma } from "@/shared";
import { Prisma, Role } from "@/generated/prisma";


export async function createUser(dto: CreateUserDto) {
  const { name, email, password, role } = dto;

  // Validation Guard
  if (!name.trim() || !email.trim() || !password.trim() ) {
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

  const userRole = role === "ADMIN" ? Role.ADMIN : Role.USER;

  const createdUser: Prisma.UserCreateInput = await prisma.user.create({ data: { name, email, hash, role: userRole } });

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
