import axios from "axios";

export const getNFTs = async (walletAddress) => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/nfts/${process.env.nft_address}/${walletAddress}`
    )
    .then((result) => {
      return result;
    });
};

export const getUserDetails = async (walletAddress) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${walletAddress}`)
    .then((result) => {
      return result;
    });
};

export const setUserDetails = async (walletAddress, userDetails) => {
  return (
    userDetails._id
      ? axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${walletAddress}`,
          userDetails
        )
      : axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${walletAddress}`,
          userDetails
        )
  ).then((result) => {
    return result;
  });
};
