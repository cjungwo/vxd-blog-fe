import { ResponseDto } from "@/shared";
import { prisma } from "@/shared";
import { User } from "@/generated/prisma";

export async function authenticate(sub: string): Promise<User | ResponseDto> {
  const user = await prisma.user.findUnique({ where: { id: sub } });

  if (!user) {
    return {
      status: 401,
      data: {
        message: "User not authenticated",
      }
    } as ResponseDto;
  }

  return user;
}
