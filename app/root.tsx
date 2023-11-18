import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Navbar } from "~/components/navbar";
import { Footer } from "./components/footer";
import WalletProvider from "~/providers/wallet";
import "@fontsource-variable/lexend-deca?inline";
import "~/assets/tailwind.css?inline";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-neutral-50 font-sans">
        <WalletProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </WalletProvider>
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
