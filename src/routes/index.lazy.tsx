import SearchForm from "@/segments/search-form";
import Results from "@/segments/results";
import { ImageDataType } from "@/types";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import NoResults from "@/segments/no-results";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [results, setResults] = useState<ImageDataType[]>([]);

  return (
    <>
      <SearchForm setResults={setResults} />
      <div className="h-[1px] bg-foreground/30 mx-4 my-2"></div>
      {results.length === 0 ? <NoResults /> : <Results results={results} />}
    </>
  );
}
