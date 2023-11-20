import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Toaster } from "react-hot-toast";
import { Navbar } from "~/components/navbar";
import WalletProvider from "~/providers/wallet";
import { commitSession, getSession } from "~/shared/session.server";
import { IAppStore, defaultAppStore } from "./shared/store";
import "@fontsource-variable/lexend-deca";
import "~/assets/tailwind.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const session = await getSession(request.headers.get("Cookie"));
  const appStore: IAppStore = session.get("appStore") ?? defaultAppStore;
  const isAuth = appStore.account.address !== undefined;

  if (
    !isAuth &&
    ["dashboard", "projects", "payments"].includes(url.pathname.split("/")[1])
  ) {
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (isAuth && url.pathname === "/") {
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const accessCode = url.searchParams.get("accessCode");
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
