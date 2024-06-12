import { Link } from "@tanstack/react-router";

const GridItem = ({
  id,
  date,
  thumbnail,
  count,
}: {
  id: number;
  date: string;
  thumbnail: string;
  count: number;
}) => {
  return (
    <Link
      to={`/${id}`}
      className="aspect-square relative rounded-md overflow-clip hover:cursor-pointer hover:scale-105 duration-200"
    >
      <img
        src={"/static/" + thumbnail}
        alt="Satellite"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 text-center text-white bg-black/60 font-semibold font-mono">
        {date}
        {/* {new Date(date).toLocaleDateString()} */}
      </div>
      <div
        className={`absolute text-center rounded-md right-2 top-2 text-white aspect-square p-1 size-6 text-xs ${count === 0 ? "bg-destructive" : "bg-sky-700"}`}
      >
        {count}
      </div>
    </Link>
  );
};

export default GridItem;
