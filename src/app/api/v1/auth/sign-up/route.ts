import { ResponseDto } from "@/shared";
import { validateBasicToken, signUp, SignUpDto, extractToken, AuthDto } from "@entities/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. extract basic token
    const authToken = extractToken(req, validateBasicToken);
    // --end--

    const { email, password } = authToken as AuthDto;

    // 2. extract request body
    const body = await req.json();

    const signUpDto: SignUpDto = new SignUpDto(email, password, body.name);

    for (const key of Object.keys(signUpDto)) {
      if (!signUpDto[key as keyof SignUpDto]?.trim()) {
        throw new Error("Invalid auth info", { cause: 401 });
      }
    }

    // 3. sign up
    const user = await signUp(signUpDto);

    return Response.json(new ResponseDto(200, { user }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}
