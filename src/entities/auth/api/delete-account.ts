import { findUserById } from "@/entities";

export const deleteAccount = async (sub: string) => {
  const user = await findUserById(sub);
  return user.id;
}
