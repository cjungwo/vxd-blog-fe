import { prisma } from "@shared/lib";
import { User } from "@/generated/prisma";

export const deleteUser = async (id: string): Promise<User> => {
  const user: User | null = await prisma.user.delete({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found", { cause: 404 });
  }

  return user;
};