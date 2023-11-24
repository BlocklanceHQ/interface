import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, Plugin } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

import { fromString } from "uint8arrays/from-string";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { globSync } from "glob";
import { readFileSync } from "fs";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { Composite } from "@composedb/devtools";

interface ViteCeramicCompositePluginOptions {
  ceramic?: CeramicClient;
  source: string;
  target: string;
}

/**
 * Vite plugin for ComposeDB.
 *
 * This plugin is used to write composites.
 * It takes an option with properties:
 * - `source`: The source directory of the composite. Defaults to `composites`.
 * - `target`: The target directory of the composite. Defaults to `ceramic.definition.json`.
 */
const viteCeramicCompositePlugin = (
  opts?: ViteCeramicCompositePluginOptions
): Plugin => {
  // @ts-ignore - config.json is auto generated if not present
  const ceramicConfig = import("./config.json").catch(() =>
    import("./scripts/generate.mjs").then(() => import("./config.json"))
  );

  const options = {
    source: "composites",
    target: "ceramic.definition.json",
    ...opts,
  };
  return {
    name: "vite-ceramic-composite-plugin",
    async load(id) {
      if (id === options.target) {
        const { seed } = await ceramicConfig;
        const key = fromString(seed, "base16");
        const did = new DID({
          resolver: getResolver(),
          provider: new Ed25519Provider(key),
        });
        await did.authenticate();
        const ceramic =
          options.ceramic ?? new CeramicClient("http://localhost:7007");
        ceramic.did = did;

        const schemaPaths = globSync(`${options.source}/**/*.schema.graphql`);

        const composites = await Promise.all(
          schemaPaths.map((schemaPath) => {
            const schema = readFileSync(schemaPath, "utf-8");
            return Composite.create({
              ceramic,
              schema,
            });
          })
        );

        const deployComposite = Composite.from(composites);
        const definition = deployComposite.toRuntime();

        await deployComposite.startIndexingOn(ceramic);
        return `export const definition = ${JSON.stringify(definition)}`;
      }
    },
  };
};

export default defineConfig({
  plugins: [
    svgr(),
    remix(),
    tsconfigPaths(),
    ViteImageOptimizer(),
    viteCeramicCompositePlugin({
      source: "./graphql/composites",
      target: "~/ceramic.definition.json",
    }),
  ],
});
