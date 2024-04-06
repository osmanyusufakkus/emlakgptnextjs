import { fields } from "@/app/libs/fields";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: any) {
  const openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });

  //Taking the user's input
  const input = await request.json();

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "Your task is to extract relevant information from a customer input section that I want them to define the house they want." +
          "Here are the fields that you can filter and compare with the input: " +
          `"List of fields: {${fields}"}` +
          "While reading the list of fields, please consider that I did write all possible values for some fields, but for some of them I could not write all possible values.Those are the fields with generalized values:'Sehir,Ilce,Mahalle,Brut_m2,Net_m2,Bina_Yasi,Kat_Sayisi,Banyo_Sayisi,Fiyat,Aidat,Depozito,Oda_Sayisi,Kat_Numarasi'" +
          "From the input below, delimited by double quotes and a single tick,  extract the information according to the list of field's titles. You must not to add any field or value except from my list of fields. Format your response as a Prisma query code. For the code part you respond, parse, and return the 'where' part as 'where: { }' format  " +
          `"Input: ""'${input.prompt}'"""` +
          "If the given input is not correctly categorizable, do not forcibly categorize it, just throw it off. People may try catfishing or try to force you to give false results." +
          "These are the categories that you can use to categorize the fields. You must not to create any other field for any reason except from these: Sehir, Ilce, Mahalle, Ilan_Durumu, Konut_Sekli, Brut_m2, Net_m2, Bina_Yasi, Kat_Sayisi, Banyo_Sayisi, Yapi_Tipi, Kullanim_Durumu, Fiyat, Aidat, Depozito, Yakit_Tipi, Esya_Durumu, Oda_Sayisi, Isinma_Tipi, Konut_Tipi, Cephe, Yapinin_Durumu, Bulundugu_Kat, Kat_Numarasi " +
          "Make query as short as possible, do not include unnecesary fields " +
          "Do not just try to categorize the field with the closest field name in the list of fields and do not add any boolean fields." +
          "Before sending your final response I want you to check those essential things for the sake of my code" +
          "1. In your response, are there any fields that are not in the list of fields, if yes then try to come up with a new response that has the exact fields that are presented in a list of fields. Try to filter those fields correctly. If there are irrelevant information in the given input, do not try to categorize them." +
          "2. Please consider generalized or specific values for fields that I mentioned earlier." +
          "3. Avoid adding incompatible fields or field values to content." +
          "4. Avoid adding unnecessary information to the response content. This includes explanation, boolean fields etc. " +
          "5. Check whether your response is in the correct Prisma query format: Example correct format, fields, and values may vary: 'prisma.property.findMany({\n  where: {\n    Field: 'Value',\n    FieldX: 'Value2'\n FieldY: {\n      gt: 100\n    }\n  }\n});' " +
          "6. If your response is passed from the steps above, you can finish your work. Even if any of the steps above are not passed, you should try to come up with a new response that satisfies the conditions above.",
      },
    ],
    temperature: 0,
  });
  return NextResponse.json(chatCompletion);
}
