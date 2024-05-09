export type ImageDataType = {
  id: number;
  latitude: string;
  longitude: string;
  date: string;
  coordinates: { x: number; y: number; width: number; height: number }[];
  thumbnailUrl: string;
  viewUrl: string;
  originalUrl: string;
};
