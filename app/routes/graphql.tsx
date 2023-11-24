import { createHandler } from "@composedb/server";
import { ActionFunctionArgs } from "@remix-run/node";

const yoga = createHandler({
  ceramic: "http://localhost:7007",
});

export async function action({ request, context }: ActionFunctionArgs) {
  return yoga(request, context);
}
