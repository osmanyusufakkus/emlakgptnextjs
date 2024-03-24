import prisma from "@/app/libs/prismadb";

export default async function getListings(text: any) {
  try {
    const cleanedText = text.replace(/"/g, ""); // Remove all double quotes from the text
    console.log("Cleaned Text:", cleanedText);
    const listings = await prisma.property.findMany({
      where: cleanedText,
    });
    return listings;
  } catch (error: any) {
    console.error(error);
  }
}
