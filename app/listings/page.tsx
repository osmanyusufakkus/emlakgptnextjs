/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import EmptyState from "@/app/components/EmptyState";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import PaginationControls from "../components/PaginationControls";
import { textStore } from "../store/textStore";
import { useEffect, useState } from "react";
import Loading from "./loading";
import qs from "qs";
import { listingCountStore } from "../store/listingCountStore";

export default function Listings({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [listings, setListings] = useState([]);
  const text = textStore((state: any) => state.text);
  const [isLoading, setIsLoading] = useState(true);

  let page = searchParams["page"] ?? "1";
  let per_page = searchParams["per_page"] ?? "12";

  const start = (Number(page) - 1) * Number(per_page); // 0, 12, 24 ...
  const end = start + Number(per_page); // 12, 24 ...

  const updateSearchParams = () => {
    page = searchParams["page"] ?? "1";
    per_page = searchParams["per_page"] ?? "12";
  };

  const queryString = qs.stringify(text);
  const getListings = async () => {
    try {
      console.log(queryString);
      const response = await fetch(`/api/listings?${queryString}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        const data = await response.json();
        setListings(data);
      } else {
        console.log("Received non-JSON response");
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getListings();
    updateSearchParams();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  const listingsPerPage = listings.slice(start, end);
  listingCountStore.getState().setListingCount(listings.length);

  return (
    <main>
      {listingsPerPage?.length === 0 && !isLoading ? (
        <EmptyState showReset />
      ) : (
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listingsPerPage.map((listing: any) => {
              return <ListingCard key={listing.id} data={listing} />;
            })}
          </div>
          <PaginationControls
            hasNextPage={end < listings.length}
            hasPrevPage={start > 0}
          />
        </Container>
      )}
    </main>
  );
}
