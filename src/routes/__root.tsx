import { ThemeToggle } from "@/components/theme-toggle";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="flex items-center justify-between py-2 px-4 bg-black text-white shadow">
        <h1 className="uppercase font-bold font-mono">
          <Link to="/">Satellite AI</Link>
        </h1>
        <ThemeToggle />
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
