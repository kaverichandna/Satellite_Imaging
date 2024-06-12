import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { DateRange } from "react-day-picker";
import { ImageDataType } from "@/types";
import axios from "axios";

const SearchForm = ({
  setResults,
}: {
  setResults: React.Dispatch<React.SetStateAction<ImageDataType[]>>;
}) => {
  const [loading, setLoading] = useState(false);

  const [coordinates, setCoordinates] = useState<{
    latitude: string;
    longitude: string;
  }>({
    latitude: "",
    longitude: "",
  });

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  function validateCoordinate(coordinate: string) {
    return !/^[0-9].*\.[0-9].*$/.test(coordinate);
  }

  function formatDate(d: Date | undefined) {
    if (d == undefined) d = new Date();

    const yyyy = d.getFullYear();
    const ms = d.getMonth() + 1;
    const ds = d.getDate();
    let dd = ds.toString();
    let mm = ms.toString();

    if (ds < 10) dd = "0" + ds.toString();
    if (ms < 10) mm = "0" + ms.toString();

    const formattedDate = dd + "-" + mm + "-" + yyyy;
    return formattedDate;
  }

  async function submitInfo() {
    setLoading(true);
    // TODO: Check if the data back from the server is actually of the type
    // TODO: Add error handling
    //

    const params = `?lat=${coordinates.latitude}&lon=${coordinates.longitude}&from=${formatDate(date?.from)}&to=${formatDate(date?.to)}`;
    const response = await axios.get(`/api${params}`);
    setResults(response.data);
    setLoading(false);
  }

  return (
    <div className="p-2 space-y-2">
      <div className="flex gap-1">
        <Input
          value={coordinates.longitude}
          onChange={(e) =>
            setCoordinates((prev) => ({ ...prev, longitude: e.target.value }))
          }
          placeholder="Longitude"
        />
        <Input
          value={coordinates.latitude}
          onChange={(e) =>
            setCoordinates((prev) => ({ ...prev, latitude: e.target.value }))
          }
          placeholder="Latitude"
        />
      </div>
      <DatePicker date={date} setDate={setDate} />
      <Button
        onClick={submitInfo}
        disabled={
          loading ||
          validateCoordinate(coordinates.longitude) ||
          validateCoordinate(coordinates.latitude) ||
          date?.from === undefined
        }
        variant={"secondary"}
        className="w-full"
      >
        Find Images
      </Button>
    </div>
  );
};

export default SearchForm;
