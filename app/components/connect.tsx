import { Menu, Transition } from "@headlessui/react";
import { XIcon, Loader2Icon } from "lucide-react";
import { useConnect } from "wagmi";
import { toast } from "react-hot-toast";
import { useSharedAccount, useIsBetaUser } from "~/shared";
import MetaMaskIcon from "~/assets/wallets/metamask.svg";
import CoinbaseIcon from "~/assets/wallets/coinbase.svg";

const walletIcons: Record<string, string> = {
  metaMask: MetaMaskIcon,
  coinbaseWallet: CoinbaseIcon,
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
      setAccount({ address: result.account });
    },
  });

  return (
    <Menu>
      <div className="relative">
        {!account.address && (
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
      </div>
      <div className="justify-start items-start gap-2.5 flex">
        <div className="w-10 h-10 relative">
          <div className="w-10 h-10 left-0 top-0 absolute">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M37.7521 29.2211C39.1883 26.4619 40 23.3257 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C23.3257 40 26.4619 39.1883 29.2211 37.7521C29.0768 37.1921 29 36.605 29 36C29 32.134 32.134 29 36 29C36.605 29 37.1921 29.0768 37.7521 29.2211ZM36.0015 32C36.001 32 36.0005 32 36 32C33.7909 32 32 33.7909 32 36C32 36.0005 32 36.001 32 36.0015C33.5151 34.8634 34.8634 33.5151 36.0015 32Z"
                fill="#EDEEF2"
              />
              <mask
                id="mask0_726_23240"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="40"
                height="40"
              >
                <circle cx="20" cy="20" r="20" fill="#C4C4C4" />
              </mask>
              <g mask="url(#mask0_726_23240)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33.9352 39.4266C35.2503 38.1195 36.001 36.6091 36.001 35C36.001 33.9821 35.7006 33.0036 35.1469 32.0912C33.3476 32.4821 32 34.0837 32 36C32 37.4536 32.7754 38.7262 33.9352 39.4266ZM31.4272 41.3001C29.9407 40.0164 29 38.1181 29 36C29 33.232 30.6066 30.8393 32.9382 29.7034C30.0287 27.4587 25.3177 26 20.001 26C11.1644 26 4.00098 30.0294 4.00098 35C4.00098 39.9706 11.1644 44 20.001 44C24.4767 44 28.5233 42.9663 31.4272 41.3001Z"
                  fill="#838799"
                />
                <circle cx="20.001" cy="17" r="6" fill="#838799" />
              </g>
            </svg>

            <div className="w-3 h-3 left-[14px] top-[11px] absolute bg-slate-500 rounded-full" />
          </div>
        </div>
      </div>
    </Menu>
  );
};
