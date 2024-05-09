import SearchForm from "@/segments/search-form";
import Results from "@/segments/results";
import { ImageDataType } from "@/types";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [results, setResults] = useState<ImageDataType[]>([]);

  return (
    <>
      <SearchForm />
      <div className="h-[1px] bg-foreground/30 mx-4 my-2"></div>
      {results.length === 0 ? <></> : <Results results={results} />}
    </>
  );
}
