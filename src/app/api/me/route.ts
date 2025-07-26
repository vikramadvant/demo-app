// src/app/api/me/route.ts
import { getOrCreateUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getOrCreateUser();
  return NextResponse.json(user);
}
