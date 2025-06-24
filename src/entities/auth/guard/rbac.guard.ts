import { ResponseDto } from "@/shared";
import { Role } from "@/generated/prisma";

export async function rbacGuard(role: Role, authenticatableRole: Role): Promise<ResponseDto | boolean> {

  if (role !== authenticatableRole) {
    return {
      status: 403,
      data: {
        message: "User not authorized",
      }
    } as ResponseDto;
  }

  return true;
}