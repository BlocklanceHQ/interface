export interface IAppStore {
  language: string;
  account: {
    name?: string;
    address?: string;
    image?: string;
    isBeta?: boolean;
  };
}

export const defaultAppStore: IAppStore = {
  language: "en",
  account: {
    name: "Guest",
  },
};
