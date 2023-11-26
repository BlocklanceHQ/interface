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
import { readFileSync, writeFileSync } from "fs";
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

        const compiledSchemaPaths = globSync(
          `${options.source}/**/*.compiled.graphql`
        );
        const rawSchemaPaths = globSync(
          `${options.source}/**/*.schema.graphql`
        );
        // build a list of all schema paths and ensure that we only have one schema per name (compiled or raw). compiled paths take precedence
        const schemaPaths = [
          ...rawSchemaPaths.filter(
            (rawPath) =>
              !compiledSchemaPaths.some(
                (compiledPath) =>
                  compiledPath.replace(".compiled", "") ===
                  rawPath.replace(".compiled", "")
              )
          ),
          ...compiledSchemaPaths,
        ];
        const { ceramic } = options;

        if (schemaPaths.length === 0 || !(ceramic instanceof CeramicClient)) {
          return "export const definition = {models:{},objects:{},enums:{},accountData:{}};";
        }

        ceramic.did = did;

        const schemas = schemaPaths
          .map((path) => {
            const source = readFileSync(path, "utf-8");
            return {
              source,
              id: path.split("/").pop()?.split(".")[0] ?? "",
              composed: source.split("$COMPOSED_").length - 1,
            };
          })
          .sort((a) => (a.composed > 0 ? 1 : -1));

        const composites: Composite[] = [];

        for (const schema of schemas) {
          const schemaSource = composites.reduce((source, c) => {
            const [streamId, streamName] = Object.entries(
              c.toJSON().aliases ?? {}
            )[0];
            return source.replace(`$COMPOSED_${streamName}_ID`, streamId);
          }, schema.source);

          const composite = await Composite.create({
            schema: schemaSource,
            ceramic,
            index: true,
          });

          composites.push(
            composite.setAliases({
              [composite.modelIDs[schema.composed]]: schema.id.toUpperCase(),
            })
          );

          const capitalizedId =
            schema.id.charAt(0).toUpperCase() + schema.id.slice(1);

          writeFileSync(
            `${options.source}/${schema.id}.compiled.graphql`,
            `type ${capitalizedId} @loadModel(id: "${
              composite.modelIDs[schema.composed]
            }") {
              id: ID!
            }`
          );
        }

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
      ceramic: process.env.CERAMIC_NODE_URL ?? "http://localhost:7007",
    }),
  ],
});
