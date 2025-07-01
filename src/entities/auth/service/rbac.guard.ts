import { Role } from "@/generated/prisma";

export function rbacGuard(role: Role, accessableRole: Role | Role[]): boolean {
  const roles = Array.isArray(accessableRole) ? accessableRole : [accessableRole];

  if (!roles.includes(role)) {
    return false;
  }

  return true;
}
