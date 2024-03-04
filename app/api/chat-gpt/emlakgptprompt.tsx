"use client";
import { NextResponse } from "next/server";
export async function POST(request: any) {
  return NextResponse.json({ message: "Hello, world!" });
}
