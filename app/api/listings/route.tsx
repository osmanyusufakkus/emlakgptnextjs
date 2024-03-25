import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import qs from "qs";


export async function GET(request: Request) {
  try {
    const params = new URLSearchParams(request.url.split('?')[1]);
    const parsedParams = qs.parse(params.toString());
    const listings = await prisma.property.findMany({
      where: parsedParams
    });
    const listingsPlain = listings.map(listing => ({
      ...listing,
      Fiyat: Number(listing.Fiyat),
      Oda_Sayisi: Number(listing.Oda_Sayisi),
      Bina_Yasi: Number(listing.Bina_Yasi),
      Brut_m2: Number(listing.Brut_m2),
      Net_m2: Number(listing.Net_m2),
      Bulundugu_Kat: Number(listing.Bulundugu_Kat),
      Kat_Sayisi: Number(listing.Kat_Sayisi),
      Aidat: Number(listing.Aidat),
      Depozito: Number(listing.Depozito),
  }));
    return NextResponse.json(listingsPlain);
  } catch (error: any) {
    console.error(error);
  }
}