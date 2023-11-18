import { createStore, defaults } from "react-sweet-state";

interface IAppStore {
  language: string;
  account: {
    name: string;
    address?: string;
    image?: string;
  };
}

const appStore = createStore({
  initialState: {
    language: "en",
    account: {
      name: "Guest",
    },
  } as IAppStore,
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
  console.log("mutator", newState);
  return newState;
};

export default appStore;
