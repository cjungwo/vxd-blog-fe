import { User } from "@/generated/prisma";
import { prisma } from "@/shared";

export const findUserById = async (id: string): Promise<User> => {
  const user: User | null = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new Error("User not found", { cause: 404 });
  }

  return user;
};
