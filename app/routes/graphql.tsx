import { createHandler } from "@composedb/server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { definition } from "~/ceramic.definition.js";

export async function action({ request, context }: ActionFunctionArgs) {
  const yoga = createHandler({
    ceramic: "http://localhost:7007",
    definition,
  });

  return yoga(request, context);
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const yoga = createHandler({
    ceramic: "http://localhost:7007",
    definition,
  });

  return yoga(request, context);
}
