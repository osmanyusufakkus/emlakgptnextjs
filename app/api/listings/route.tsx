import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import qs from "qs";

export async function GET(request: Request) {
  try {
    const params = qs.parse(request.url.split("?")[1]);
    console.log("Params: " + JSON.stringify(params, null, 2));
    const fields = [
      "Fiyat",
      "Bina_Yasi",
      "Brut_m2",
      "Net_m2",
      "Kat_Sayisi",
      "Aidat",
      "Depozito",
      "Banyo Sayisi",
    ];
    const parsedParams: any = {};
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "string") {
        if (fields.includes(key)) {
          parsedParams[key] = Number(value);
        } else {
          parsedParams[key] = value;
        }
      } else if (typeof value === "object") {
        const paramObject: any = {}; 
        for (const [subKey, subValue] of Object.entries(value)) {
          if (fields.includes(key)) {
            paramObject[subKey] = Number(subValue);
            parsedParams[key] = paramObject;
          }
        }
      }
    }

    console.log("Parsed Params:" + JSON.stringify(parsedParams, null, 2));
    const listings = await prisma.property.findMany({
      where: parsedParams,
    });
    const listingsPlain = listings.map((listing) => ({
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
