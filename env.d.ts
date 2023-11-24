/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare module "~/ceramic.definition.json" {
  import { RuntimeCompositeDefinition } from "@composedb/types";
  const definition: RuntimeCompositeDefinition;
  export { definition };
}
