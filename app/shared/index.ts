import { createHook } from "react-sweet-state";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import appStore, { IAppStore } from "./store";
import { useMemo } from "react";

export const useAppStore = createHook(appStore);

export const useIsAuthenticated = createHook(appStore, {
  selector: (state) => !!state.account.address,
});

export const useIsBetaUser = createHook(appStore, {
  selector: (state) => !!state.account.isBeta,
});

export const useStoredAccount = createHook(appStore, {
  selector: (state) => state.account,
});

export const useSharedAccount = (): [
  IAppStore["account"],
  (a: Partial<IAppStore["account"]>) => void
] => {
  const { address } = useAccount();
  const { data: name } = useEnsName({ address });
  const { data: image } = useEnsAvatar({ name });
  const [storedAccount, { setAccount }] = useStoredAccount();

  const account = useMemo(() => {
    if (storedAccount.address === address) {
      return {
        ...storedAccount,
        name: name || storedAccount.name,
        image: image || storedAccount.image,
      };
    }
    return storedAccount;
  }, [storedAccount, address, name, image]);

  return [account, setAccount];
};
