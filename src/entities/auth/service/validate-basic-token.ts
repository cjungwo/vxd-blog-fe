import { AuthDto } from "../model";

export const validateBasicToken = (rawToken: string): AuthDto => {
  try {
    const basicSplit = rawToken.split(' ');

    if (basicSplit.length !== 2) {
      throw new Error("Invalid token", { cause: 401 });
    }

    const [basic, token] = basicSplit;

    if (basic.toLowerCase() !== 'basic') {
      throw new Error("Invalid token", { cause: 401 });
    }

    const decodedSplit = Buffer.from(token, 'base64').toString('utf-8').split(':');

    if (decodedSplit.length !== 2) {
      throw new Error("Invalid token", { cause: 401 });
    }

    const [email, password] = decodedSplit;

    return new AuthDto(email, password);

  } catch (error) {
    throw error;
  }
}
