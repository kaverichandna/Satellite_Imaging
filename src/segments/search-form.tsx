import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { DateRange } from "react-day-picker";
import { ImageDataType } from "@/types";

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

  function submitInfo() {
    setLoading(true);
    const params = `?lat=${coordinates.latitude}&lon=${coordinates.longitude}&from=${date?.from?.getTime()}&to=${date?.to?.getTime()}`;
    console.log(params);
    // TODO: Check if the data back from the server is actually of the type
    // TODO: Add error handling
    fetch("/images.json")
      .then((response) => response.json())
      .then((data) => setResults(data));
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
