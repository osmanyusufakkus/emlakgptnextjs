"use client";

import { Property } from "@prisma/client";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Link from "next/link";

interface ListingCardProps {
  data: Property;
}

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full h-full relative overflow-hidden rounded-xl">
          <Link href={data.Link}>
          <Image
            className="object-cover group-hover:scale-110 transition"
            src={data.Fotograf ?? ""}
            alt={data.Baslik}
            width={400}
            height={400}
          />
          </Link>
          <div className="absolute top-3 right-3">
            <HeartButton />
          </div>
        </div>
        <div className="font-semibold text-lg">{data.Baslik}</div>
        <div className="font-light text-neutral-500">{String(data.Fiyat)} TL</div>
      </div>
    </div>
  );
};

export default ListingCard;
