import jwt from "jsonwebtoken";

import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

export const verifyToken = (token: string, isRefreshToken: boolean = false) => {
  try {
    const secret = isRefreshToken ? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET;

    if (!secret) {
      throw new Error('Token secret is not configured', { cause: 500 });
    }

    const decodedToken = jwt.verify(token, secret);

    if (!decodedToken) {
      throw new Error('Invalid token', { cause: 401 });
    }

    return decodedToken;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new Error('Token has expired', { cause: 401 });
    } else if (error instanceof JsonWebTokenError) {
      throw new Error('Invalid token', { cause: 401 });
    } else if (error instanceof Error) {
      console.error('Token verification error:', error.message);
      throw new Error('Token verification failed', { cause: 500 });
    }
    console.error('Unexpected error during token verification:', error);
    throw new Error('Internal server error', { cause: 500 });
  }
};
