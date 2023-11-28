import { useMemo } from "react";
import { useFetcher, useLoaderData, useOutletContext } from "@remix-run/react";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { IAppStore, defaultAppStore } from "./store";

export const useAppStore = () => {
  const context = useOutletContext<IAppStore>();
  const loaderData = useLoaderData<{ appStore?: IAppStore }>();

  if (loaderData?.appStore) {
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

export const useIsAuthenticated = () => !!useSharedAccount()[0].address;

export const useIsBetaUser = () => !!useStoredAccount().isBeta;

export const useSharedAccount = (): [
  IAppStore["account"],
  (a: Partial<IAppStore["account"]>) => void
] => {
  const setAppStore = useSetAppStore("update");
  const resetAppStore = useSetAppStore("reset");
  const { address, isConnected } = useAccount({
    onDisconnect() {
      resetAppStore();
    },
  });
  const storedAccount = useStoredAccount();
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

  return [account, (a) => setAppStore({ account: { ...account, ...a } })];
};
