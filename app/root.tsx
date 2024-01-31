import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import stylesheet from "~/styles.css";
import Button from "./components/Button";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

const rootPaths = /^\/(artist|designer|researcher|$)/;
export default function App() {
  const location = useLocation();

  return (
    <html lang="en" style={{ fontSize: 18 }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={`min-h-screen font-sans text-white`}>
        <div className="fixed left-0 top-0 -z-10 h-screen w-screen bg-gradient-to-br from-black to-gray-800"></div>
        <div className="sticky !z-50 h-12 w-screen px-6 pt-2 md:flex">
          <Link
            to="/"
            className="grow text-center font-serif text-xl font-bold md:text-left"
          >
            <h1>Joshua Tazman Reinier</h1>
          </Link>
          <div className="flex h-12 items-center justify-between space-x-2">
            <Button click="/about">about</Button>
            <Button click="/portfolio">portfolio</Button>
            {/* <Button click="/contact">contact</Button> */}
          </div>
        </div>
        <Outlet />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
