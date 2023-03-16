import { ethers } from "ethers";
import abi from "./abi";

export const claim = async (nftIDs, shippingFee) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(window.ethereum.selectedAddress);

  let contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi,
    signer
  );

  await contract.claim(nftIDs, {
    value: shippingFee,
  });
};

export const isClaimed = async (nftId) => {
  // Connect to the network
  let provider = ethers.getDefaultProvider("goerli", {
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  });

  // We connect to the Contract using a Provider, so we will only
  // have read-only access to the Contract
  let contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi,
    provider
  );
  return contract.isClaimed(nftId);
};

export const getShippingFee = async (nftId) => {
  // Connect to the network
  let provider = ethers.getDefaultProvider("goerli", {
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  });

  // We connect to the Contract using a Provider, so we will only
  // have read-only access to the Contract
  let contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi,
    provider
  );
  return contract.shippingFee();
};
