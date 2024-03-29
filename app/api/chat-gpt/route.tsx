import { NextResponse } from "next/server";
import OpenAI, { ClientOptions } from "openai";

export async function POST(request: any) {
  const openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });

  //Taking the user's input
  const input = await request.json();

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "The following AI tool helps identifying following properties from the users request. " +
          "In database, a sample property table row like that: " +
          "'Sehir': 'Türkiyedeki bütün şehirler'," +
          "'Ilce': 'Türkiyedeki bütün ilçeler'," +
          "'Mahalle': 'Türkiyedeki bütün mahalleler'," +
          "'Guncellendigi_Tarih': '02-10-2023'," +
          "'Ilan_Durumu': 'Kiralık','Satılık'," +
          "'Konut_Sekli': 'Ara Kat Dubleks','Bahçe Dubleksi','Bahçe Katı','Çatı Dubleksi','Daire','Dubleks','İkiz Ev','Müstakil Ev','Ters Dubleks','Tripleks','Fourlex'," +
          "'Brut_m2': '140'," +
          "'Net_m2': '120'," +
          "'Bina_Yasi': '15'," +
          "'Kat_Sayisi': '1 Katlı','2 Katlı','3 Katlı','4 Katlı','5 Katlı'," +
          "'Banyo_Sayisi': 2," +
          "'Yapi_Tipi': 'Ahşap','Betonarme','Çelik','Kütük','Prefabrik','Taş Bina','Yığma'," +
          "'Kullanim_Durumu': 'Boş','Kiracılı','Mülk Sahibi'," +
          "'Aidat': '1.350'," +
          "'Depozito': '20.500'," +
          "'Yakit_Tipi': 'Doğalgaz','Kömür-Odun','Akaryakıt','Elektrik'," +
          "'Yetkili_Ofis': 'Evet','Hayır'.\n Please consider alternatives while producing code. Alternatives to all files are specified as this:" +
          "Esya_Durumu: 'Eşyalı', 'Eşyasız'," +
          "Oda_Sayisi: 4+1','2+1','1+1','3+1','1+0','6+1','5+1','4+2'," +
          "Isinma_Tipi: 'Güneş Enerjisi','Kat Kaloriferi' ,'Klima','Kombi','Merkezi','Merkezi (Pay Ölçer)','Soba','Jeotermal Isıtma','Yerden Isıtma','Doğalgaz Sobası','Fancoil Ünitesi','VRV','Isı Pompası'," +
          "Konut_Tipi: 'Daire', 'Villa','Müstakil Ev','Prefabrik','Bina','Residence','Yazlık','Köy Evi','Çiftlik Evi','Köşk','Yalı Dairesi','Yalı','Dağ Evi','Loft Daire','Kooperatif'," +
          "Cephe: 'Kuzey Cephe', 'Güney Cephe', 'Doğu Cephe', 'Batı Cephe'," +
          "Yapinin_Durumu: 'İkinci El', 'Sıfır', 'Yapım Aşamasında'," +
          "Bulundugu_Kat: 'Yüksek Giriş','Ara Kat','En Üst Kat','Çatı Katı','Teras Katı','Bodrum ','Yarı Bodrum','Bodrum ve Zemin','Zemin','Bahçe Katı','Giriş Katı','Villa Katı','Asma Kat','Kot 1','Kot 2','1','2','3','4',",
      },
      {
        role: "user",
        content: `"User1: '${input.prompt}'"`,
      },
      {
        role: "user",
        content:
          "For the user requesting above, we need to create a prisma code to fetch according to fields. " +
          "For the codepart you respond, can you parse and return 'where' part as 'where: { }' format?",
      },
    ],
  });
  return NextResponse.json(chatCompletion);
}
