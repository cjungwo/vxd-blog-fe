import { prisma, ResponseDto } from "@/shared";
import { User } from "@/generated/prisma";
import { UpdateUserDto } from "@/entities";
import * as bcrypt from "bcryptjs";

export const updateUser = async (dto: UpdateUserDto) => {
  let hash: string | undefined;

  if (dto.password) {
    hash = await bcrypt.hash(dto.password, 10);
  }

  const user: User | null = await prisma.user.update({
    where: {
      id: dto.id,
    },
    data: {
      name: dto.name,
      email: dto.email,
      hash,
      role: dto.role,
    },
  });

  if (!user) {
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
      user,
    },
  } as ResponseDto;
};