import { User } from "@/generated/prisma";
import { prisma } from "@/shared";

export const findUserById = async (id: string): Promise<User | null> => {
  const user: User | null = await prisma.user.findUnique({ where: { id } });

  return user;
};
