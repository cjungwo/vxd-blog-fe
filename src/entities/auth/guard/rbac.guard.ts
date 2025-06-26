import { ResponseDto } from "@/shared";
import { Role } from "@/generated/prisma";

export async function rbacGuard(role: Role, authenticatableRole: Role | Role[]): Promise<ResponseDto | boolean> {

  if (typeof authenticatableRole === 'string') {
    authenticatableRole = [authenticatableRole];
  }

  if (!authenticatableRole.includes(role)) {
    return {
      status: 403,
      data: {
        message: "User not authorized",
      }
    } as ResponseDto;
  }

  return true;
}