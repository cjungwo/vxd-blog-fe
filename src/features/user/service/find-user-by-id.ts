import { prisma } from "@/shared";
import { ResponseDto } from "@/shared";

export async function findUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return {
    status: 404,
    data: {
      message: "User not found"
    }
  } as ResponseDto;

  return user;
}
