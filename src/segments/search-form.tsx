import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DatePicker } from "./date-picker";
import { DateRange } from "react-day-picker";

const SearchForm = () => {
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
        disabled={
          coordinates.longitude.length === 0 ||
          coordinates.latitude.length === 0 ||
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
