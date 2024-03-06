import EmptyState from "@/app/components/EmptyState";

export default function Listings() {
  const isEmpty = true;

  if (isEmpty) {
    return <EmptyState showReset />;
  }
}
