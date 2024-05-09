import GridItem from "./components/grid-item";

export type ImageDataType = {
  latitude: string;
  longitude: string;
  date: Date;
  coordinates: { x: number; y: number; width: number; height: number }[];
  thumbnailUrl: string;
  viewUrl: string;
  originalUrl: string;
};

const Results = ({ results }: { results: ImageDataType[] }) => {
  return (
    <div className="px-2">
      <h2 className="text-xl uppercase font-mono font-bold tracking-wider mb-2">
        Results
      </h2>
      <div className="grid grid-cols-4 gap-2">
        {results.map((result) => (
          <GridItem
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
