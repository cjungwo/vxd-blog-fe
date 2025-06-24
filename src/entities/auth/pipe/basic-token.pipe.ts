import { ResponseDto } from "@/shared";

export const basicTokenPipe = (rawToken: string) => {
  const basicSplit = rawToken.split(' ');

  if (basicSplit.length !== 2) return {
    status: 401,
    data: {
      message: "Unauthorized token format"
    }
  } as ResponseDto;

  const [basic, token] = basicSplit;

  if (basic.toLowerCase() !== 'basic') return {
    status: 401,
    data: {
      message: "Unauthorized token type"
    }
  } as ResponseDto;

  const decodedSplit = Buffer.from(token, 'base64').toString('utf-8').split(':');

  if (decodedSplit.length !== 2) return {
    status: 401,
    data: {
      message: "Unauthorized basic token format"
    }
  } as ResponseDto;

  const [email, password] = decodedSplit;

  return {
    email,
    password,
  };
}
