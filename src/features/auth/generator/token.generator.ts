import { User } from "@/entities"
import jwt from "jsonwebtoken";

export const generateToken = (user: User, isRefreshToken: boolean) => {
  const token = {
    sub: user.id,
    type: isRefreshToken ? 'refresh' : 'access',
  }

  const secret = isRefreshToken ? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET;
  const expiresIn = isRefreshToken ? '3600h' : '1h';
  
  return jwt.sign(token, secret!, { expiresIn });
}
