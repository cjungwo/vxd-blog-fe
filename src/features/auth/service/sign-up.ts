import { CreateUserDto } from "@/entities";
import { createUser } from "@/features/user";

export const signUp = async (dto: CreateUserDto) => {
  return createUser(dto);
};
