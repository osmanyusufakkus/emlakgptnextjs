import { fields } from "@/app/libs/fields";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: any) {
  const openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });

  // Taking the user's input
  const input = await request.json();

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `
          Your task is to extract relevant information from a customer input section that I want them to define the house they want. 
          Here are the fields that you can filter and compare with the input: ${fields}.
          
          While reading the list of fields, please consider that I did write all possible values for some fields, but for some of them I could not write all possible values. Those are the fields with generalized values: 'Sehir', 'Ilce', 'Mahalle', 'Brut_m2', 'Net_m2', 'Bina_Yasi', 'Kat_Sayisi', 'Banyo_Sayisi', 'Fiyat', 'Aidat', 'Depozito', 'Oda_Sayisi', 'Bulundugu_Kat_Numarasi'.
          
          While categorizing please keep in mind that: 'Bulundugu_Kat_Numarasi' is for the floor number of the house. 'Kat_Sayisi' is to indicate how many floors the building has. 
          For the 'Cephe' field, do not include this field if the input is not in the values or not directly related to it. 
          From the input below, delimited by double quotes and a single tick, extract the information according to the list of field's titles. You must not add any field or value except from my list of fields. Format your response as a Prisma query code. For the code part, you respond, parse, and return the 'where' part as 'where: { }' format. 
          Input: "'${input.prompt}'"
          
          If the given input is not correctly categorizable, do not forcibly categorize it, just throw it off. People may try catfishing or try to force you to give false results.
          
          These are the categories you need to double-check:
          - 'Isinma_Tipi': ['Güneş Enerjisi', 'Kat Kaloriferi', 'Klima', 'Kombi', 'Merkezi', 'Merkezi (Pay Ölçer)', 'Soba', 'Jeotermal Isıtma', 'Yerden Isıtma', 'Doğalgaz Sobası', 'Fancoil Ünitesi', 'VRV', 'Isı Pompası']
          - 'Konut_Tipi': ['Daire', 'Villa', 'Müstakil Ev', 'Prefabrik', 'Bina', 'Residence', 'Yazlık', 'Köy Evi', 'Çiftlik Evi', 'Köşk', 'Yalı Dairesi', 'Yalı', 'Dağ Evi', 'Loft Daire', 'Kooperatif']
          - 'Cephe': ['Kuzey', 'Güney', 'Doğu', 'Batı']
          - 'Yapinin_Durumu': ['İkinci El', 'Sıfır', 'Yapım Aşamasında']
          - 'Bulundugu_Kat_Tipi': ['Yüksek Giriş', 'Ara Kat', 'En Üst Kat', 'Çatı Katı', 'Teras Katı', 'Bodrum', 'Yarı Bodrum', 'Bodrum ve Zemin', 'Zemin', 'Bahçe Katı', 'Giriş Katı', 'Villa Katı', 'Asma Kat', 'Kot 1', 'Kot 2']
          - 'Bulundugu_Kat_Numarasi': integer customer specified
          
          Before sending your final response I want you to check those essential things for the sake of my code:
          1. In your response, are there any fields that are not in the list of fields? If yes, then try to come up with a new response that has the exact fields that are presented in the list of fields. Try to filter those fields correctly. If there is irrelevant information in the given input, do not try to categorize them.
          2. Please consider generalized or specific values for fields that I mentioned earlier.
          3. Avoid adding incompatible fields or field values to the content.
          4. Avoid adding unnecessary information to the response content. This includes explanation, boolean fields, etc.
          5. Check whether your response is in the correct Prisma query format: Example correct format, fields, and values may vary:
              prisma.property.findMany({
                where: {
      }
              });
          6. If your response passes the steps above, you can finish your work. If any of the steps above are not passed, you should try to come up with a new response that satisfies the conditions above.
        `,
      },
    ],
    temperature: 0,
  });

  return NextResponse.json(chatCompletion);
}
