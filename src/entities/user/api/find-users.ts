import { prisma } from "@/shared";
import { User } from "@/generated/prisma";

export async function findUsers(): Promise<User[]> {
  const users: User[] = await prisma.user.findMany();

  return users;
}
