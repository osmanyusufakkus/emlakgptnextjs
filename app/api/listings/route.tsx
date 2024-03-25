import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
    const params = new URLSearchParams(request.url.split('?')[1]);
    const listings = await prisma.property.findMany({
      where: Object.fromEntries(params),
    });
    return NextResponse.json(listings);
  } catch (error: any) {
    console.error(error);
  }
}