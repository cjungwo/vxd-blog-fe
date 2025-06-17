export class User {
  id: string;
  name: string;
  email: string;
  hash: string;
  createdAt: string;
  updatedAt: string;

  constructor(id: string, name: string, email: string, hash: string, createdAt: string, updatedAt: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.hash = hash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};
