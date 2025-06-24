import { signIn } from "@entities/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return signIn(req);
}
