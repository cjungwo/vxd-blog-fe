export class Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  

  constructor(id: string, title: string, content: string, authorId: string, author: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
