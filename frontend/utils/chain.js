import { ethers } from "ethers";
import abi from "./abi";

export const claim = async (nftIDs) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(window.ethereum.selectedAddress);

  console.log(provider);
  console.log(signer);
  console.log(nftIDs);

  let contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi,
    signer
  );
  console.log("nft address", process.env.nft_address, nftIDs);
  // Create a new instance of the Contract with a Signer, which allows
  // update methods

  // console.log(signer);
  // console.log(nftIDs);

  await contract.claim(process.env.nft_address, nftIDs);
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
  return contract.isClaimed(process.env.nft_address, nftId);
};
