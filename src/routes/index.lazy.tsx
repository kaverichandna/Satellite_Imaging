import SearchForm from "@/components/search-form";
import Results, { ImageDataType } from "@/results";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [results, setResults] = useState<ImageDataType[]>([
    {
      thumbnailUrl:
        "https://images.unsplash.com/photo-1441644599508-24ae08965c5c?q=80&w=340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date(),
      coordinates: [],
      latitude: "833.2",
      longitude: "833.2",
      viewUrl: "",
      originalUrl: "",
    },
  ]);

  return (
    <>
      <SearchForm />
      <div className="h-[1px] bg-foreground/30 mx-4 my-2"></div>
      {results.length === 0 ? <></> : <Results results={results} />}
    </>
  );
}
