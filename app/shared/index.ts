import { useMemo } from "react";
import { useFetcher, useLoaderData, useOutletContext } from "@remix-run/react";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { IAppStore, defaultAppStore } from "./store";

export const useAppStore = () => {
  const context = useOutletContext<IAppStore>();
  const loaderData = useLoaderData<{ appStore?: IAppStore }>();

  if (loaderData.appStore) {
    return loaderData.appStore;
  }
  return context || defaultAppStore;
};

export const useSetAppStore = (action: string) => {
  const fetcher = useFetcher();
  const formData = new FormData();
  formData.append("action", action);

  return (data?: Partial<IAppStore>) => {
    formData.append("data", JSON.stringify(data));
    fetcher.submit(formData, { method: "POST", action: "/auth" });
  };
};

export const useStoredAccount = () => useAppStore().account;

export const useIsAuthenticated = () => !!useStoredAccount().address;

export const useIsBetaUser = () => !!useStoredAccount().isBeta;

export const useSharedAccount = (): [
  IAppStore["account"],
  (a: Partial<IAppStore["account"]>) => void
] => {
  const { address, isConnected } = useAccount();
  const storedAccount = useStoredAccount();
  const setAppStore = useSetAppStore("update");
  const { data: name } = useEnsName({ address, enabled: isConnected });
  const { data: image } = useEnsAvatar({ name, enabled: isConnected });

  const account = useMemo(() => {
    return {
      ...storedAccount,
      address: storedAccount.address === address ? address : undefined,
      name: name || storedAccount.name,
      image: image || storedAccount.image,
    };
  }, [storedAccount, address, name, image]);

  return [account, (b) => setAppStore({ account: { ...account, ...b } })];
};
