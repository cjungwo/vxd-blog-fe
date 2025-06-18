import { ResponseDto } from "@/shared";
import { prisma } from "@/shared";

export async function findUsers() {
  const users= await prisma.user.findMany();

  const result: ResponseDto = {
    status: 200,
    data: {
      users,
    }
  };

  return result;
}
