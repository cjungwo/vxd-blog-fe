import { users } from "@/entities";
import { ResponseDto } from "@/shared";

export async function findUsers() {
  const result: ResponseDto = {
    status: 200,
    data: {
      users,
    }
  };

  return result;
}
