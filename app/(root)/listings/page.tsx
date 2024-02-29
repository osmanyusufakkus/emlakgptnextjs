import EmptyState from "@/app/components/emptyState";

export default function Listings() {
  const isEmpty = true;

  if (isEmpty) {
    return <EmptyState showReset />;
  }
}
