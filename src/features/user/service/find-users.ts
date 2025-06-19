import { ResponseDto } from "@/shared";
import { prisma } from "@/shared";
import { User } from "@/generated/prisma";

export async function findUsers() {
  const users: User[] = await prisma.user.findMany();

  const result: ResponseDto = {
    status: 200,
    data: {
      users,
    }
  };

  return result;
}
