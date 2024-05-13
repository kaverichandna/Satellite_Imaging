import GridItem from "@/components/grid-item";
import { ImageDataType } from "@/types";

const Results = ({ results }: { results: ImageDataType[] }) => {
  return (
    <div className="px-2">
      <h2 className="text-xl uppercase font-mono font-bold tracking-wider mb-2">
        Results
      </h2>
      <div className="grid grid-cols-2 xl:grid-cols-8 sm:grid-cols-4 gap-2">
        {results.map((result) => (
          <GridItem
            key={result.id}
            id={result.id}
            thumbnail={result.thumbnailUrl}
            date={result.date}
            count={result.coordinates.length}
          />
        ))}
      </div>
    </div>
  );
};

export default Results;
