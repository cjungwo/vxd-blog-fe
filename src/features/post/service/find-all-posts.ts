import { posts } from "@/entities";
import { ResponseDto } from "@/shared";

export async function findAllPosts() {
    const result: ResponseDto = {
        status: 200,
        data: {
            posts: posts,
        }
    };

    return result;
}
