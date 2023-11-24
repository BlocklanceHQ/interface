import KeyDIDResolver from "key-did-resolver";
import { randomBytes } from "crypto";
import { toString } from "uint8arrays/to-string";
import { writeFileSync } from "fs";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";

const generateAdminKeyDid = async () => {
  const seed = new Uint8Array(randomBytes(32));
  const keyResolver = KeyDIDResolver.getResolver();
  const did = new DID({
    provider: new Ed25519Provider(seed),
    resolver: {
      ...keyResolver,
    },
  });
  await did.authenticate();
  return {
    seed: toString(seed, "base16"),
    did,
  };
};

generateAdminKeyDid().then((config) => {
  writeFileSync(`${process.cwd()}/config.json`, JSON.stringify(config));
});
