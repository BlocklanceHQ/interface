import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Toaster } from "react-hot-toast";
import { Navbar } from "~/components/navbar";
import WalletProvider from "~/providers/wallet";
import { commitSession, getSession } from "~/shared/session.server";
import { IAppStore, defaultAppStore } from "./shared/store";
import "@fontsource-variable/lexend-deca";
import "~/assets/tailwind.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const queryParams = new URLSearchParams(request.url.split("?")[1]);
  const session = await getSession(request.headers.get("Cookie"));
  const appStore: IAppStore = session.get("appStore") ?? defaultAppStore;

  const accessCode = queryParams.get("accessCode");
  if (accessCode === "backdrop") {
    appStore.account.isBeta = true;
  }

  return json(
    { appStore },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export default function App() {
  const { appStore } = useLoaderData<typeof loader>();
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
          <div className="mx-4 md:mx-16 my-8">
            <Outlet context={appStore} />
          </div>
        </WalletProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "text-xs",
            style: { background: "rgb(53 26 229)", color: "white" },
            duration: 3000,
          }}
        />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
