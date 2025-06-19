export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author?: { name: string };
  createdAt: Date;
  updatedAt: Date;
}
