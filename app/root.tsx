import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "~/components/navbar";
import WalletProvider from "~/providers/wallet";
import "@fontsource-variable/lexend-deca";
import "~/assets/tailwind.css";

export default function App() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-neutral-50 font-sans">
        <WalletProvider>
          <Navbar />
          <div className="mx-4 md:mx-16 my-8">
            <Outlet />
          </div>
        </WalletProvider>
        <Toaster position="bottom-right" />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
