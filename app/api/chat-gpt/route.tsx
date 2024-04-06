import { NextResponse } from "next/server";
import OpenAI, { ClientOptions } from "openai";

export async function POST(request: any) {
  const openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });

  const fields = [
    "'Sehir': 'Türkiyedeki bütün şehirler'," +
      "'Ilce': 'Türkiyedeki bütün ilçeler'," +
      "'Mahalle': 'Türkiyedeki bütün mahalleler'," +
      "'Guncellendigi_Tarih': '02-10-2023'," +
      "'Ilan_Durumu': 'Kiralık','Satılık'," +
      "'Konut_Sekli': 'Ara Kat Dubleks','Bahçe Dubleksi','Bahçe Katı','Çatı Dubleksi','Daire','Dubleks','İkiz Ev','Müstakil Ev','Ters Dubleks','Tripleks','Fourlex'," +
      "'Brut_m2': '140'," +
      "'Net_m2': '120'," +
      "'Bina_Yasi': '15'," +
      "'Kat_Sayisi': '1','2','3','4','5'," +
      "'Banyo_Sayisi': 2," +
      "'Yapi_Tipi': 'Ahşap','Betonarme','Çelik','Kütük','Prefabrik','Taş Bina','Yığma'," +
      "'Kullanim_Durumu': 'Boş','Kiracılı','Mülk Sahibi'," +
      "'Fiyat': '20000'" +
      "'Aidat': '1350'," +
      "'Depozito': '20500'," +
      "'Yakit_Tipi': 'Doğalgaz','Kömür-Odun','Akaryakıt','Elektrik'," +
      "'Yetkili_Ofis': 'Evet','Hayır'," +
      "'Esya_Durumu': 'Eşyalı', 'Eşyasız'," +
      "'Oda_Sayisi': 4+1','2+1','1+1','3+1','1+0','6+1','5+1','4+2'," +
      "'Isinma_Tipi': 'Güneş Enerjisi','Kat Kaloriferi' ,'Klima','Kombi','Merkezi','Merkezi (Pay Ölçer)','Soba','Jeotermal Isıtma','Yerden Isıtma','Doğalgaz Sobası','Fancoil Ünitesi','VRV','Isı Pompası'," +
      "'Konut_Tipi': 'Daire', 'Villa','Müstakil Ev','Prefabrik','Bina','Residence','Yazlık','Köy Evi','Çiftlik Evi','Köşk','Yalı Dairesi','Yalı','Dağ Evi','Loft Daire','Kooperatif'," +
      "'Cephe': 'Kuzey Cephe', 'Güney Cephe', 'Doğu Cephe', 'Batı Cephe'," +
      "'Yapinin_Durumu': 'İkinci El', 'Sıfır', 'Yapım Aşamasında'," +
      "'Bulundugu_Kat': 'Yüksek Giriş','Ara Kat','En Üst Kat','Çatı Katı','Teras Katı','Bodrum ','Yarı Bodrum','Bodrum ve Zemin','Zemin','Bahçe Katı','Giriş Katı','Villa Katı','Asma Kat','Kot 1','Kot 2','1','2','3','4',",
  ];

  //Taking the user's input
  const input = await request.json();

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "Your task is to extract relevant information from a customer input section that I want them to define the house they want." +
          "Here are the fields that the user can define: " +
          `"List of fields: {${fields}"}` +
          "From the input below, delimited by double quotes and a single tick,  extract the information according to the list of field's titles. Format your response as a prisma query code. For the codepart you respond, parse and return 'where' part as 'where: { }' format  " +
          `"Input: ""'${input.prompt}'"""` +
          "Before sending your final response I want you check those essential things for the sake of my code" +
          "1. In your response, are there any fields that are not in the list of fields, if yes then try to come up with a new response which has exact fields that are presented in list of fields. Try to filter those fields correctly. If there are irrelevant information in the text, do not try to categorize them." +
          "2. Check whether your response is in correct format: Correct format: 'prisma.property.findMany({where: {Oda_Sayisi:'2+1',Net_m2:{gte:80},Fiyat:{lte:20000},Bina_Yasi:{lte:15},Isinma_Tipi:'Kombi',Yakit_Tipi:'Doğalgaz',Kat_Sayisi:{lte:5}}});' " +
          "3. If your response is passed from first and second steps, you can finish your work.",
      },
    ],
    temperature: 0,
  });
  return NextResponse.json(chatCompletion);
}
