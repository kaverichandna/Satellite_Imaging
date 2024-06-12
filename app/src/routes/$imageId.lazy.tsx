import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { ImageDataType } from "@/types";

export const Route = createLazyFileRoute("/$imageId")({
  component: ImagePage,
});

function ImagePage() {
  const { imageId } = Route.useParams();
  const [spillData, setSpillData] = useState<ImageDataType | undefined>(
    undefined,
  );

  useEffect(() => {
    axios.get(`/api/${imageId}`).then((res) => {
      setSpillData(res.data);
    });
  }, []);

  if (!spillData) return <>Loading Data ...</>;

  return (
    <div className="p-4">
      <h2 className="text-2xl uppercase font-mono font-bold mb-2">
        Image Details <span className="opacity-50">#{imageId}</span>
      </h2>
      <div className="relative text-white overflow-hidden">
        <img className="w-full" src={`/static/${spillData.viewUrl}`} />
        {spillData.coordinates.map(({ x, y, width, height }) => (
          <div
            style={{ left: x, top: y, width: width, height: height }}
            className="absolute bg-red-500 border border-red-500 border-dashed bg-opacity-50"
          ></div>
        ))}

        <div className="absolute bottom-0 left-0 px-2">
          {spillData.longitude}
          <span className="ml-4">{spillData.latitude}</span>
        </div>
        <div className="absolute bottom-0 right-0 px-2">{spillData.date}</div>
      </div>

      <Table>
        <TableCaption>A list of all Oil Spills.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>X</TableHead>
            <TableHead>Y</TableHead>
            <TableHead>Width</TableHead>
            <TableHead>Height</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spillData.coordinates.map(({ x, y, width, height }) => (
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>{x}</TableCell>
              <TableCell>{y}</TableCell>
              <TableCell>{width}</TableCell>
              <TableCell>{height}</TableCell>
              <TableCell>
                <div className="bg-red-500 size-2 rounded-full"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
