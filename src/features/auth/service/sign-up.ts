import { createUser } from "@/features/user";

export const signUp = async (email: string, password: string, name: string) => {
  return createUser({ email, password, name });
};
