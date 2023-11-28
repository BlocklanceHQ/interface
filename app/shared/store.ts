export interface IAppStore {
  language: string;
  account: {
    name?: string;
    address?: string;
    image?: string;
    isBeta?: boolean;
    description?: string;
    username?: string;
    skills?: string[];
    gender?: string;
    createdAt?: string;
  };
}

export const defaultAppStore: IAppStore = {
  language: "en",
  account: {
    name: "Guest",
  },
};
