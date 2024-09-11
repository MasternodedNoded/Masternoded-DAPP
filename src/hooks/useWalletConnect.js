import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

function useWalletConnect() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address?.toLowerCase());
    } else {
      setUserAddress("");
    }
  }, [address, isConnected]);

  return {
    userAddress,
    open
  };
}

export default useWalletConnect;
