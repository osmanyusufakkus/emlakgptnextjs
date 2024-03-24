"use client";
import EmptyState from "@/app/components/EmptyState";
import Container from "../components/Container";
import { getListings } from "../components/navbar/Navbar";
import ListingCard from "../components/listings/ListingCard";
import Image from "next/image";
import { textStore } from "../store/textStore";

export default async function Listings() {
  const text = textStore((state: any) => state.text);
  const listings = await getListings(text);
  const isEmpty = true;

  if (isEmpty && listings?.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings?.map((listing: any) => {
          return <ListingCard key={listing.id} data={listing} />;
        })}
      </div>
    </Container>
  );
}
