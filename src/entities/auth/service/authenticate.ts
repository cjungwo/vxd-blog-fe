import { ResponseDto } from "@/shared";
import { findUserById } from "@/entities/user";
import { User } from "@/generated/prisma";

export async function authenticate(sub: string): Promise<User | ResponseDto> {
  const user = await findUserById(sub);
  
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
