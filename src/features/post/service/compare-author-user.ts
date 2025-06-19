import { ResponseDto } from "@/shared";

export async function compareAuthorUser(authorId: string, sub: string): Promise<boolean | ResponseDto> {
  if (authorId !== sub) {
    return {
      status: 403,
      data: {
        message: "You are not an author of this post",
      }
    } as ResponseDto;
  }

  return true;
}
