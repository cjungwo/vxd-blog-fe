import { CreateUserDto, User, users } from "@/entities";
import { generateId, ResponseDto } from "@/shared";
import bcrypt from "bcryptjs";

export async function createUser(dto: CreateUserDto) {
  const { name, email, password } = dto;

  // Validation Guard
  if (!name.trim() || !email.trim() || !password.trim()) {
    return {
      status: 400,
      data: {
        message: "Invalid user data",
      }
    } as ResponseDto;
  }

  const user = users.find((user) => user.email === email);

  if (user) {
    return {
      status: 400,
      data: {
        message: "User already exists",
      }
    } as ResponseDto;
  }

  // Business Logic
  const hash = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: generateId("U"),
    name,
    email,
    hash,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);

  console.log(users);

  // Result Checking
  const createdUser = users.find((user) => user.id === newUser.id);

  if (!createdUser) {
    return {
      status: 400,
      data: {
        message: "Failed to create user",
      }
    } as ResponseDto;
  }

  // Create Response
  const result: ResponseDto = {
      status: 201,
      data: {
          id: createdUser.id,
      }
  };

  // Return Response
  return result;
}
