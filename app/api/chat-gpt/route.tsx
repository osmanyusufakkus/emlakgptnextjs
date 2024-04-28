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
        "Your task is to parse customer input and extract information to define their desired house. Use the following fields for filtering and comparison:"+
        `"List of fields: {${fields}"}`+
        "Note that some fields have generalized values: 'Sehir, Ilce, Mahalle, etc."+
        "Consider these guidelines:"+
        "1. Only use fields from the provided list. Exclude irrelevant information."+
        "2. Recognize location-related suffixes in Turkish (e.g., '-da', '-de', '-un') to identify cities and districts."+
        "3. Match 'bahçeli ev' with 'Bahçe Dubleksi' or 'Bahçe Katı'. Ignore 'teras' or 'balkon' unless specified."+
        "4. Use the 'or' operator for inputs with multiple values for a field."+
        "5. Default 'Bulundugu_Kat_Tipi' to 'Ara kat' unless 'Dubleks' is specified."+
        "6. Extract only the information explicitly stated by the customer. Ignore requests for features not listed in the fields."+
        "focus on the fields that can be directly matched, such as 'Konut_Sekli', 'Brut_m2', and 'Banyo_Sayisi'. Do not create fields for specific views or interior features unless they are included in the list of fields."+
        "For example, if a customer is looking for a duplex, 'Konut_Sekli' should be set to 'Dubleks', and if they specify a preference for a top-floor unit, 'Bulundugu_kat_tipi' should be set to 'Çatı Katı'."+
        "Ensure that the values you assign to these fields are accurate and correspond to the customer's request. If the customer does not provide specific information for 'Bulundugu_kat_tipi', default to 'Ara Kat' unless 'Dubleks' is mentioned."+
        "For example, if a customer says 'Konyada 3+1 asansörlü ev arıyorum', your response should only include the 'Sehir' and 'Oda_Sayisi' fields, ignoring 'asansörlü' since it is not part of the fields list."+
        "Check whether your response is in the correct Prisma query format: Example correct format, fields, and values may vary: 'prisma.property.findMany({\n  where: {\n    Field: 'Value',\n    FieldX: 'Value2'\n FieldY: {\n      gt: 100\n    }\n  }\n});' "+
        "Format your response as a Prisma query within 'where: { }'. Ensure the query is succinct and correctly formatted. Do not create new fields or values outside the provided list, especially for 'Cephe', 'Yapi_Tipi', 'Isinma_tipi', 'Kullanim_Durumu', and 'Mahalle'."+
        "Remember to match the customer's request with the list of fields and ignore unmatched requests. For 'Cephe', use 'Kuzey', 'Güney', 'Doğu', 'Batı' as values, and translate common expressions accordingly."+
        `"Input: ""'${input.prompt}'"""`+
        "Double-check the Fields and set values inside [] brackets against "+
        "double-check the Sehir field it should be cities in turkey. If it is not specified just dont return this field and never return 'Türkiyedeki Bütün şehirler'"+
        "Double-check the Ilce field it should be districts in turkey. If it is not specified just dont return this field and never return 'Türkiyedeki Bütün ilçeler'"+
        "Double-Check Mahalle field it should be neighbourhoods in turkey. If it is not specified just dont return this field and never return 'Türkiyedeki Bütün mahalleler" +
        "double-check the Ilan_Durumu field it should be 'Kiralık','Satılık. If it is not specified in the input dont return this field.If this field value doesn't match with your value don't try the match return as a empty field.'"+
        "Double-check the Konut_Sekli field it should be 'Ara Kat Dubleks','Bahçe Dubleksi','Bahçe Katı','Çatı Dubleksi','Daire','Dubleks','İkiz Ev','Müstakil Ev','Ters Dubleks','Tripleks','Fourlex'.If it is not specified in the input dont return this field.If this field value doesn't match with your value don't try the match return as a empty field."+
        "Double-check the Brut_m2 field it should be intager customer specified"+
        "Double-check the Net_m2 field it should be intager customer specified"+
        "Double-check the Bina_Yasi field it should be intager customer specified"+
        "Double-check the Kat_Sayisi field it should be intager customer specified"+
        "Double-check the Banyo_Sayisi field it should be intager customer specified"+
        "Double-check the Yapi_Tipi field it should be 'Ahşap','Betonarme','Çelik','Kütük','Prefabrik','Taş Bina','Yığma'.If it is not specified in the input dont return this field.If this field value doesn't match with your value don't try the match return as a empty field."+
        "Double-check the Kullanim_Durumu field it should be 'Boş','Kiracılı','Mülk Sahibi'.If it is not specified in the input dont return this field.If this field value doesn't match with your value don't try the match return as a empty field."+
        "Double-check the Fiyat field it should be intager customer specified"+
        "Double-check the Aidat field it should be intager customer specified"+
        "Double-check the Depozito field it should be intager customer specified"+
        "Double-check the Yakit_Tipi field it should be 'Doğalgaz','Kömür-Odun','Akaryakıt','Elektrik'.If it is not specified in the input dont return this field.If this field value doesn't match with your value don't try the match return as a empty field."+
        "Double-check the Esya_Durumu field it should be 'Eşyalı', 'Eşyasız'.If it is not specified in the input dont return this field.If this field value doesn't match with your value don't try the match return as a empty field."+
        "Double-check the Oda_Sayisi field it should be '4+1','2+1','1+1','3+1','1+0','6+1','5+1','4+2' and something customer specified"+
        "Double-check the Isinma_Tipi field it should be 'Güneş Enerjisi','Kat Kaloriferi' ,'Klima','Kombi','Merkezi','Merkezi (Pay Ölçer)','Soba','Jeotermal Isıtma','Yerden Isıtma','Doğalgaz Sobası','Fancoil Ünitesi','VRV','Isı Pompası'.If it is not specified in the input dont return this field.If this field value doesn't match with your value don't try the match return as a empty field."+
        "Double-check the Konut_Tipi field it should be 'Daire', 'Villa','Müstakil Ev','Prefabrik','Bina','Residence','Yazlık','Köy Evi','Çiftlik Evi','Köşk','Yalı Dairesi','Yalı','Dağ Evi','Loft Daire','Kooperatif'.If it is not specified in the input dont return this field.If this field value doesn't match with your value don't try the match return as a empty field."+
        "Double-check the Cephe field it should be 'Kuzey', 'Güney', 'Doğu', 'Batı'.If it is not specified in the input dont return this field.If this field value doesn't match with your value don't try the match return as a empty field." +
        "Double-check the Yapinin_Durumu field it should be 'İkinci El', 'Sıfır', 'Yapım Aşamasında'.If it is not specified in the input dont return this field.If this field value doesn't match with your value don't try the match return as a empty field."+
        "Double-check the Bulundugu_Kat_Tipi field it should be 'Yüksek Giriş','Ara Kat','En Üst Kat','Çatı Katı','Teras Katı','Bodrum ','Yarı Bodrum','Bodrum ve Zemin','Zemin','Bahçe Katı','Giriş Katı','Villa Katı','Asma Kat','Kot 1','Kot 2'.If it is not specified in the input dont return this field.If this field value doesn't match with your value don't try the match return as a empty field."+
        "Double-check the Bulundugu_Kat_Numarasi field it should be intager customer specified"+
        "After double-checking the fields, rewrite the prisma query according to the instructions",

        },
    ],
    temperature: 0,
  });
  return NextResponse.json(chatCompletion);
}
