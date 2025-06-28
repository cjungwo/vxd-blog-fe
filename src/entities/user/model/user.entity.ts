import { Post, Role } from "@/generated/prisma";

export interface User {
  id: string;
  name: string;
  email: string;
  hash: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[];
};
