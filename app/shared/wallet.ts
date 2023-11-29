import { useContractWrite, usePrepareContractWrite } from "wagmi";
import BlockCrowFactory from "./artifacts/BlockCrowFactory.json";

interface EscrowOptions {}

export const useCreateEscrow = ({}: EscrowOptions) => {
  const preparedContract = usePrepareContractWrite({
    address: import.meta.env.ESCROW_FACTORY,
    abi: BlockCrowFactory.abi,
  });
  return useContractWrite(preparedContract.config);
};
