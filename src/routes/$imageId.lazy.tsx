import { createLazyFileRoute } from "@tanstack/react-router";
export const Route = createLazyFileRoute("/$imageId")({
  component: ImagePage,
});

function ImagePage() {
  const { imageId } = Route.useParams();
  return (
    <>
      <div>{imageId}</div>
    </>
  );
}
