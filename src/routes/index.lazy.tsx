import SearchForm from "@/components/search-form";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SearchForm />
      <div className="h-[1px] bg-foreground/30 mx-4 my-2"></div>
    </>
  );
}
