import { ResponseDto } from "@/shared";
import { Role } from "@/generated/prisma";

export function rbacGuard(role: Role, accessableRole: Role | Role[]): ResponseDto | boolean {

  if (!Array.isArray(accessableRole)) {
    accessableRole = [accessableRole];
  }

  if (!accessableRole.includes(role)) {
    return {
      status: 403,
      data: {
        message: "User not authorized",
      }
    } as ResponseDto;
  }

  return true;
}