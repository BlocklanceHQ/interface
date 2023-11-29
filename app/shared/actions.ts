import { ComposeClient } from "@composedb/client";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { definition } from "~/ceramic.definition.js";

export const ceramic = new CeramicClient(import.meta.env.CERAMIC_NODE_URL);

export const composeClient = new ComposeClient({
  ceramic: import.meta.env.CERAMIC_NODE_URL,
  definition,
});

export const createProject = async (formData: FormData) => {
  return await composeClient.executeQuery(``);
};

export const createOrFindUser = async (formData: FormData) => {
  return await composeClient.executeQuery(``);
};

export const createGig = async (formData: FormData) => {
  return await composeClient.executeQuery(``);
};

export const findProject = async (formData: FormData) => {
  return await composeClient.executeQuery(``);
};

export const findGig = async (formData: FormData) => {
  return await composeClient.executeQuery(``);
};

export const findGigs = async (formData: FormData) => {
  return await composeClient.executeQuery(``);
};

export const findProjects = async (formData: FormData) => {
  return await composeClient.executeQuery(``);
};
