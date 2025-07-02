import jwt from "jsonwebtoken";

export const verifyToken = (token: string, isRefreshToken: boolean = false) => {
  try {
    const secret = isRefreshToken ? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET;

    const decodedToken = jwt.verify(token, secret!);

    if (!decodedToken) {
      throw new Error("Invalid token", { cause: 401 });
    }

    return decodedToken;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid token", { cause: 401 });
  }
}
