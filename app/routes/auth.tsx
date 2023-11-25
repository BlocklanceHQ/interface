import { ActionFunctionArgs, json } from "@remix-run/node";
import { commitSession, getSession } from "~/shared/session.server";
import { defaultAppStore } from "~/shared/store";
import { definition } from "~/ceramic.definition.js";

console.log(definition);

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("action")?.toString();
  const session = await getSession(request.headers.get("Cookie"));
  const appStore = session.get("appStore") ?? defaultAppStore;

  if (action === "update") {
    const body = JSON.parse(formData.get("data")?.toString() ?? "{}");
    const newStore = { ...appStore, ...body };
    session.set("appStore", newStore);
  }

  if (action === "reset") {
    session.unset("appStore");
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
