import { User } from "../entity";
import { prisma } from "@/shared";

export const findUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { id } });

  return user;
};