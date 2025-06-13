import { UpdatePostDto } from "@/entities";
import { deletePost, findPostById, updatePost } from "@/features";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) { 
  const { id } = await params;

  const result = await findPostById(id);

  return Response.json(result);
}

export async function PUT(request: Request, { params }: Params) { 
  const { id } = await params;
  const body = await request.json();

  const dto: UpdatePostDto = {
    id,
    ...body,
  };

  const result = await updatePost(dto);

  return Response.json(result);
}

export async function DELETE(_: Request, { params }: Params) { 
  const { id } = await params;
  const result = await deletePost(id);
  return Response.json(result);
}

