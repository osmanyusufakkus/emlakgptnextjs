import prisma from "@/app/libs/prismadb"

export default async function getListings() {
    try{
        const listings = await prisma.property.findMany({
            where: {
                Konut_Sekli: "Daire"
            }
        })
        return listings;
    }catch(error:any){
        console.error(error)
    }
}