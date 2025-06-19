import { Role } from "@/generated/prisma";

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: Role;

  constructor(name: string, email: string, password: string, role?: Role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
