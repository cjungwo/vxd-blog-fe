import { Role } from "@/generated/prisma";

export class SignUpDto {
    email: string;
    password: string;
    name: string;
    role: Role;

    constructor(email: string, password: string, name: string, role?: Role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role || Role.USER;
    }
}
