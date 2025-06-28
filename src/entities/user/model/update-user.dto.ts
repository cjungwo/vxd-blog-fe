import { Role } from "@/generated/prisma";

export class UpdateUserDto {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: Role;

  constructor(id: string, name?: string, email?: string, password?: string, role?: Role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
