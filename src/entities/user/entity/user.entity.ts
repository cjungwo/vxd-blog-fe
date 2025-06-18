import { Post } from "@/entities/post";

export class User {
  id: string;
  name: string;
  email: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];

  constructor(id: string, name: string, email: string, hash: string, createdAt: Date, updatedAt: Date, posts: Post[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.hash = hash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.posts = posts;
  }
};
