import { prisma } from "@/shared";
import { User } from "@/generated/prisma";
import { UpdateUserDto } from "@/entities";
import * as bcrypt from "bcryptjs";

export const updateUser = async (dto: UpdateUserDto): Promise<User> => {
  let hash: string | undefined;

  if (dto.password) {
    hash = await bcrypt.hash(dto.password, Number(process.env.HASH_ROUNDS!));
  }

  const user: User | null = await prisma.user.update({
    where: {
      id: dto.id,
    },
    data: {
      name: dto.name,
      email: dto.email,
      hash,
      role: dto.role,
    },
  });

  if (!user) {
    throw new Error("User update failed", { cause: 400 });
  }

  return user;
};