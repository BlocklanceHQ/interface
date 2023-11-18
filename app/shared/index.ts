import { createHook } from "react-sweet-state";
import appStore from "./store";

export const useAppStore = createHook(appStore);

export const useIsAuthenticated = createHook(appStore, {
  selector: (state) => !!state.account.address,
});

export const useSharedAccount = createHook(appStore, {
  selector: (state) => state.account,
});
