import bcrypt from "bcryptjs";
import { CreateUserDto } from "@entities/user";
import { prisma } from "@/shared";
import { User } from "@/generated/prisma";

export async function createUser(dto: CreateUserDto): Promise<User> {
  try {
    const { name, email, password, role } = dto;

    const hash = await bcrypt.hash(password, Number(process.env.HASH_ROUNDS!));

    const createdUser: User | null = await prisma.user.create({ data: { name, email, hash, role } });

    if (!createdUser) {
      throw new Error("Failed to create user", { cause: 400 });
    }

    return createdUser;
  } catch (error) {
    throw error;
  }
}
