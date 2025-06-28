import { prisma } from "@shared/lib";
import { ResponseDto } from "@shared/dto";
import { User } from "@/generated/prisma";

export const deleteUser = async (id: string) => {
  const result: User | null = await prisma.user.delete({
    where: {
      id,
    },
  });

  if (!result) {
    return {
      status: 404,
      data: {
        message: "User not found",
      }
    } as ResponseDto;
  }

  return {
    status: 200,
    data: {
      id: result.id,
    },
  } as ResponseDto;
};