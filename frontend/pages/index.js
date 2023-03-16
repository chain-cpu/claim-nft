import { useState, useEffect } from "react";
import {
  claim,
  getShippingFee,
  isClaimed as checkIfClaimed,
} from "../utils/chain";

import Link from "next/link";
import Metamask from "../component/metamask";
import { getNFTs } from "../utils/api";
import { BigNumber, ethers } from "ethers";

const Index = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [nfts, setNfts] = useState([]);
  const [isClaimed, setIsClaimed] = useState(false);
  const [client, setclient] = useState({
    isConnected: false,
  });
  const [isClaiming, setIsClaiming] = useState(false);

  const checkConnection = async () => {
    const { ethereum } = window;
    if (ethereum) {
      sethaveMetamask(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setclient({
          isConnected: true,
          address: accounts[0],
        });
      } else {
        setclient({
          isConnected: false,
        });
      }
    } else {
      sethaveMetamask(false);
    }
  };

  const connectWeb3 = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setclient({
        isConnected: true,
        address: accounts[0],
      });
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  const handleClaim = async () => {
    if (!nfts.length) return;
    setIsClaiming(true);
    getShippingFee().then((data) => {
      claim(nfts, data)
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
        .finally(() => {
          setIsClaimed(true);
          setIsClaiming(false);
        });
    });
    // claim(nfts);
  };

  useEffect(() => {
    checkConnection();
  }, []);
  useEffect(() => {
    if (client.isConnected) {
      getNFTs(
        /*"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"*/ client.address
      ).then((res) => {
        // setNfts(res.data);
        setNfts(res.data.map((d) => d.tokenId));
        if (res.data.length > 0) {
          checkIfClaimed(res.data[0].tokenId).then((r) => {
            console.log(r);
            setIsClaimed(r);
          });
        }
      });
    }
  }, [client]);

  return (
    <>
      {/* Navbar */}
      <nav className="fren-nav d-flex">
        <div>
          <h3>MENU_</h3>
        </div>
        <div className="d-flex" style={{ marginLeft: "auto" }}>
          <div>
            <button className="btn connect-btn" onClick={connectWeb3}>
              {client.isConnected ? (
                <>
                  {client.address.slice(0, 6)}...
                  {client.address.slice(38, 42)}
                </>
              ) : (
                <>Connect Wallet</>
              )}
            </button>
          </div>
          {/* <div> */}
          {/* <Link href={{ pathname: "/profile", query: client.address }}> */}
          {client.isConnected && (
            <Link href={`/profile/${client.address}`}>
              <button className="btn tw-btn">Profile</button>
            </Link>
          )}
          {/* </div> */}
        </div>
      </nav>
      {/* Navbar end */}

      <section className="container d-flex">
        <main>
          <h1 className="main-title">NFT Reward Claim Track 🚀</h1>

          <p className="main-desc">
            Feel free to claim your rewards from holding NFTs by clicking the
            button below
          </p>

          {/* ---- */}
          <span>
            {!haveMetamask ? (
              <Metamask />
            ) : client.isConnected ? (
              <>
                <br />
                <h2>You're connected ✅</h2>
                <div>
                  {nfts /*.map((nft) => nft.tokenId)*/
                    .join(" ")}
                </div>
                <button
                  onClick={handleClaim}
                  type="button"
                  className="btn sign-btn"
                  disabled={isClaimed || isClaiming}
                >
                  {isClaiming
                    ? "Claiming..."
                    : isClaimed
                    ? "Claimed !!!"
                    : "Claim"}
                </button>
              </>
            ) : (
              <>
                <br />
                <button className="btn connect-btn" onClick={connectWeb3}>
                  Connect Wallet
                </button>
              </>
            )}
          </span>
          {/* ---- */}
        </main>
      </section>
    </>
  );
};

export default Index;
