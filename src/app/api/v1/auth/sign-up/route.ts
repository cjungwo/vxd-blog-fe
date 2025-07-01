import { ResponseDto } from "@/shared";
import { AuthDto, validateBasicToken, signUp, SignUpDto } from "@entities/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const basicToken: string | null = req.headers.get('Authorization');

    if (!basicToken) {
      throw new Error("Unauthorized token", { cause: 401 });
    }

    const authToken: AuthDto | ResponseDto = validateBasicToken(basicToken);
    
    if (authToken instanceof ResponseDto) return Response.json(authToken);
    
    const { email, password } = authToken;

    const body = await req.json();

    const signUpDto: SignUpDto = new SignUpDto(email, password, body.name);

    for (const key of Object.keys(signUpDto)) {
      if (!signUpDto[key as keyof SignUpDto]?.trim()) {
        throw new Error("Invalid auth info", { cause: 401 });
      }
    }

    const user = await signUp(signUpDto);

    const responseDto: ResponseDto = {
      status: 200,
      data: {
        user
      }
    };

    return Response.json(responseDto);
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}
