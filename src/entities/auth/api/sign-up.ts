import { createUser, CreateUserDto } from "@entities/user";
import { SignUpDto } from "../model";
import { findUserByEmail } from "@entities/user";
import { User } from "@/generated/prisma";

export const signUp = async (signUpDto: SignUpDto): Promise<User> => {
  try {
    const user = await findUserByEmail(signUpDto.email);

    if (user) {
      throw new Error("User already exists", { cause: 400 });
    }

    const createUserDto: CreateUserDto = {
      name: signUpDto.name,
      email: signUpDto.email,
      password: signUpDto.password,
      role: signUpDto.role,
    };

    return createUser(createUserDto);
  } catch (error) {
    throw error;
  }
};
