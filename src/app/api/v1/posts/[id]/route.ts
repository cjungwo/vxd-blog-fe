import { UpdatePostDto } from "@/entities";
import { deletePost, findPostById, updatePost } from "@/features";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: Params) { 
  const { id } = await params;

  const result = await findPostById(id);

  return new Response(JSON.stringify(result));
}

export async function PUT(request: Request, { params }: Params) { 
  const { id } = await params;
  const body = await request.json();

  const dto: UpdatePostDto = {
    id,
    ...body,
  };

  const result = await updatePost(dto);

  return new Response(JSON.stringify(result));
}

export async function DELETE(request: Request, { params }: Params) { 
  const { id } = await params;
  const result = await deletePost(id);
  return new Response(JSON.stringify(result));
}
