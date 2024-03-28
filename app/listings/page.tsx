/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import EmptyState from "@/app/components/EmptyState";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { textStore } from "../store/textStore";
import { useEffect, useState } from "react";
import Loading from "./loading";
import qs from "qs";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const text = textStore((state: any) => state.text);
  const [isLoading, setIsLoading] = useState(true);

  const queryString =  qs.stringify(text); 
  const getListings = async () => {
    try {
      const response = await fetch(`/api/listings?${queryString}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => setListings(data));
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListings();
  },[]);


  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
     {listings?.length === 0 && !isLoading ? (
        <EmptyState showReset />
      ) : (
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings?.map((listing: any) => {
              return <ListingCard key={listing.id} data={listing} />;
            })}
          </div>
        </Container>
      )}
    </main>
  );
}
