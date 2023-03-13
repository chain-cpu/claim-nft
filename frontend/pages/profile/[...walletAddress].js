import React from "react";
import { useRouter } from "next/router";
import UserForm from "../../component/userform";

function Profile() {
  const router = useRouter();
  const { walletAddress } = router.query;

  return <UserForm walletAddress={walletAddress} />;
}

export default Profile;
