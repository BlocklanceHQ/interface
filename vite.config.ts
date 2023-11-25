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
import { generateLocalConfig } from "./scripts/generate.mjs";

interface ViteCeramicCompositePluginOptions {
  ceramic?: CeramicClient | string;
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
    generateLocalConfig()
  );

  const options = {
    source: "composites",
    target: "ceramic.definition.json",
    ...opts,
  };

  try {
    if (typeof options.ceramic === "string") {
      options.ceramic = new CeramicClient(options.ceramic);
    }
  } catch (e) {
    throw new Error(
      "Invalid ceramic client. Please provide a valid ceramic client or url"
    );
  }

  return {
    name: "vite-ceramic-composite-plugin",
    resolveId(id) {
      if (id === options.target) {
        return id;
      }
    },
    async load(id) {
      if (id === options.target) {
        const { seed } = await ceramicConfig;
        const key = fromString(seed, "base16");
        const did = new DID({
          resolver: getResolver(),
          provider: new Ed25519Provider(key),
        });
        await did.authenticate();

        const schemaPaths = globSync(`${options.source}/**/*.schema.graphql`);
        const { ceramic } = options;

        if (schemaPaths.length === 0 || !(ceramic instanceof CeramicClient)) {
          return "export const definition = {models:{},objects:{},enums:{},accountData:{}};";
        }

        ceramic.did = did;

        const composites = await Promise.all(
          schemaPaths.map((schemaPath) => {
            const schema = readFileSync(schemaPath, "utf-8");
            return Composite.create({
              ceramic,
              schema,
              index: true,
            });
          })
        ).catch((e) => {
          console.error(e);
          return [];
        });

        if (composites.length === 0) {
          return "export const definition = {models:{},objects:{},enums:{},accountData:{}};";
        }

        const deployComposite = Composite.from(composites);
        const definition = deployComposite.toRuntime();
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
      target: "~/ceramic.definition.js",
      ceramic: process.env.CERAMIC_NODE_URL,
    }),
  ],
});
