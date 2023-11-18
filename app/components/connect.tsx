import { Menu, Transition } from "@headlessui/react";
import { XIcon, Loader2Icon } from "lucide-react";
import { useConnect } from "wagmi";
import { toast } from "react-hot-toast";
import { useSharedAccount } from "~/shared";
import MetaMaskIcon from "~/assets/wallets/metamask.svg";
import CoinbaseIcon from "~/assets/wallets/coinbase.svg";

const walletIcons: Record<string, string> = {
  metaMask: MetaMaskIcon,
  coinbaseWallet: CoinbaseIcon,
};

export const ConnectWallet = () => {
  const [, { setAccount }] = useSharedAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect({
    onError() {
      toast("Error connecting to wallet");
    },
    onSuccess(result) {
      toast("Successfully connected to wallet");
      setAccount({ address: result.account, name: result.account });
    },
  });

  return (
    <div className="relative">
      <Menu>
        <Menu.Button
          disabled={isLoading}
          className={`px-6 py-3 bg-primary-700 rounded-md shadow justify-center items-center gap-2.5 flex text-neutral-50 text-xs font-medium leading-normal ${
            isLoading ? "cursor-progress opacity-40" : "hover:bg-primary-600"
          }`}
          title={
            isLoading
              ? `Connecting with ${pendingConnector?.name}`
              : "Connect Wallet"
          }
        >
          {isLoading && <Loader2Icon className="animate-spin" size={20} />}
          Connect Wallet
        </Menu.Button>
        <Transition
          as={Menu.Items}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className="absolute right-0 px-8 py-6 mt-12 w-80 origin-top-right divide-y divide-gray-100 rounded-lg bg-neutral-50 shadow-lg ring-1 ring-black/5 focus:outline-none flex flex-col gap-6 z-20"
        >
          <Menu.Item disabled>
            {({ close }) => (
              <div>
                <h3 className="text-black text-base font-medium flex justify-between mb-4">
                  <span>Connect Wallet</span>{" "}
                  <XIcon size={20} onClick={close} className="cursor-pointer" />
                </h3>
                <p className="text-neutral-600 text-xs mb-1">
                  Select what network and wallet you want to connect below
                </p>
              </div>
            )}
          </Menu.Item>
          {connectors.map((connector) => (
            <Menu.Item key={connector.id}>
              {() => (
                <button
                  disabled={!connector.ready}
                  onClick={() => connect({ connector })}
                  className="px-4 py-3 bg-zinc-100 hover:bg-zinc-300 rounded-md justify-between items-center inline-flex disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-neutral-600 text-xs font-medium">
                    {connector.name}
                  </span>
                  <div className="w-6 h-6 px-0.5 py-0.5 justify-center items-center flex">
                    {!isLoading &&
                      connector.id !== pendingConnector?.id &&
                      connector.id in walletIcons && (
                        <img src={walletIcons[connector.id]} />
                      )}
                    {isLoading && connector.id === pendingConnector?.id && (
                      <Loader2Icon className="animate-spin" />
                    )}
                  </div>
                </button>
              )}
            </Menu.Item>
          ))}
        </Transition>
      </Menu>
    </div>
  );
};
