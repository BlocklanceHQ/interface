import { createHandler } from "@composedb/server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { definition } from "~/ceramic.definition.js";

const yoga = createHandler({
  ceramic: process.env.CERAMIC_NODE_URL ?? "",
  definition,
});

export async function action({ request, context }: ActionFunctionArgs) {
  return yoga(request, context);
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  return yoga(request, context);
}
