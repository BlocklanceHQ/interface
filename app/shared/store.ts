import { createStore, defaults } from "react-sweet-state";

interface IAppStore {
  language: string;
  account: {
    name: string;
    address?: string;
    image?: string;
  };
}

const defaultAppStore: IAppStore = {
  language: "en",
  account: {
    name: "Guest",
  },
};

const appStore = createStore({
  get initialState(): IAppStore {
    const persistedStore = globalThis.localStorage?.getItem("appStore");
    return persistedStore ? JSON.parse(persistedStore) : defaultAppStore;
  },
  actions: {
    setLanguage(language: string) {
      return ({ setState }) => {
        setState({ language });
      };
    },
    setAccount(account: IAppStore["account"]) {
      return ({ setState }) => {
        setState({ account });
      };
    },
  },
  name: "appStore",
});

defaults.mutator = (currentState, partialState) => {
  const newState = Object.assign({}, currentState, partialState);
  globalThis.localStorage?.setItem("appStore", JSON.stringify(newState));
  return newState;
};

export default appStore;
