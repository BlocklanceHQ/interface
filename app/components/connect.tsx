import { Menu, Transition } from "@headlessui/react";
import { XIcon, Loader2Icon } from "lucide-react";
import { useConnect, Connector, useDisconnect } from "wagmi";
import { toast } from "react-hot-toast";
import { useSharedAccount, useIsBetaUser } from "~/shared";
import ProfileSvg from "~/assets/svg/profile.svg";
import MetaMaskIcon from "~/assets/wallets/metamask.svg";
import CoinbaseIcon from "~/assets/wallets/coinbase.svg";

const walletIcons: Record<string, string> = {
  metaMask: MetaMaskIcon,
  coinbaseWallet: CoinbaseIcon,
};

const ProfileButton: React.FC<
  React.ComponentPropsWithRef<"img"> & { isOnline?: boolean }
> = ({ isOnline, ...props }) => {
  return (
    <span className="justify-start items-start gap-2.5 flex">
      <span className="w-10 h-10 relative">
        <img alt="Profile Photo" {...props} />
        <span
          className={`w-3 h-3 border-2 border-neutral-100 right-0 bottom-0 absolute ${
            isOnline ? "bg-green-600" : "bg-slate-500"
          } rounded-full`}
        />
      </span>
    </span>
  );
};

const ConnectWalletMenu: React.FC<{
  connect: (options: { connector: Connector }) => void;
  connectors: Connector[];
  pendingConnector?: Connector;
  isLoading: boolean;
}> = ({ connectors, pendingConnector, isLoading, connect }) => {
  return (
    <>
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
                {isLoading && connector.id === pendingConnector?.id ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  connector.id in walletIcons && (
                    <img src={walletIcons[connector.id]} alt={connector.name} />
                  )
                )}
              </div>
            </button>
          )}
        </Menu.Item>
      ))}
      <Menu.Item disabled>
        {() => (
          <a
            href="https://www.coinbase.com/wallet"
            target="_blank"
            className="block text-neutral-600 text-xs font-medium underline text-center pt-3"
          >
            I don&apos;t have a wallet
          </a>
        )}
      </Menu.Item>
      <Menu.Item disabled>
        {() => (
          <div className="w-full py-3 text-neutral-400 text-xs">
            By connecting wallet i agree to the{" "}
            <span className="text-stone-900 text-xs font-medium underline">
              terms and conditions
            </span>{" "}
            &{" "}
            <span className="text-stone-900 text-xs font-medium underline">
              privacy policy
            </span>
          </div>
        )}
      </Menu.Item>
    </>
  );
};

const ProfileMenu: React.FC<{
  account: { address?: string; image?: string; name?: string };
  disconnect: () => void;
}> = ({ account, disconnect }) => {
  return (
    <>
      <Menu.Item disabled>
        {({ close }) => (
          <div>
            <h3 className="text-black text-base font-medium flex justify-between mb-4">
              {account.name}
            </h3>
            <p className="text-neutral-600 text-xs mb-1">{account.address}</p>
          </div>
        )}
      </Menu.Item>
      <Menu.Item disabled>
        {() => (
          <button
            onClick={disconnect}
            className="px-4 py-3 bg-zinc-100 hover:bg-zinc-300 rounded-md justify-between items-center inline-flex"
          >
            <span className="text-neutral-600 text-xs font-medium">Logout</span>
          </button>
        )}
      </Menu.Item>
    </>
  );
};

export const ConnectWallet = () => {
  const [isBetaUser] = useIsBetaUser();
  const [account, { setAccount }] = useSharedAccount();

  const { connect, connectors, isLoading, pendingConnector } = useConnect({
    onError() {
      toast.error("Error connecting to wallet");
    },
    onSuccess(result) {
      toast.success("Successfully connected to wallet");
      setAccount({ address: result.account, name: result.account });
    },
  });

  const { disconnect } = useDisconnect({
    onSuccess() {
      toast.success("Successfully disconnected wallet");
      setAccount({ address: undefined, name: "Guest", image: undefined });
    },
    onError() {
      toast.error("Error disconnecting wallet");
    },
  });

  return (
    <Menu>
      <div className="relative">
        {account.address ? (
          <Menu.Button>
            <ProfileButton src={account.image ?? ProfileSvg} isOnline />
          </Menu.Button>
        ) : (
          <Menu.Button
            disabled={!isBetaUser || isLoading}
            className={`px-6 py-3 bg-primary-700 rounded-md shadow justify-center items-center gap-2.5 flex text-neutral-50 text-xs font-medium leading-normal ${
              !isBetaUser || isLoading
                ? "cursor-progress opacity-40"
                : "hover:bg-primary-600"
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
        )}
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
          {account.address ? (
            <ProfileMenu account={account} disconnect={() => disconnect()} />
          ) : (
            <ConnectWalletMenu
              connect={connect}
              connectors={connectors}
              pendingConnector={pendingConnector}
              isLoading={isLoading}
            />
          )}
        </Transition>
      </div>
      {!account.address && <ProfileButton src={ProfileSvg} />}
    </Menu>
  );
};
