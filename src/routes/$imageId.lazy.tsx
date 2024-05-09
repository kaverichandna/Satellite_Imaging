import { createLazyFileRoute } from "@tanstack/react-router";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createLazyFileRoute("/$imageId")({
  component: ImagePage,
});

function ImagePage() {
  const { imageId } = Route.useParams();
  return (
    <div className="p-4">
      <h2 className="text-2xl uppercase font-mono font-bold mb-2">
        Image Details <span className="opacity-50">#{imageId}</span>
      </h2>
      <div className="relative text-white">
        <img
          className="w-full"
          src="https://images.unsplash.com/photo-1441644599508-24ae08965c5c?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div
          style={{ left: 300, top: 200, width: 50, height: 30 }}
          className="absolute bg-red-500 border border-red-500 border-dashed bg-opacity-50"
        ></div>

        <div className="absolute bottom-0 left-0 px-2">
          33.29323<span className="ml-4">92.84592</span>
        </div>
        <div className="absolute bottom-0 right-0 px-2">23/04/2024</div>
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
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>300</TableCell>
            <TableCell>200</TableCell>
            <TableCell>50</TableCell>
            <TableCell>30</TableCell>
            <TableCell>
              <div className="bg-red-500 size-2 rounded-full"></div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
