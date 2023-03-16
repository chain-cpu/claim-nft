const express = require("express");
const router = express.Router();

const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const { MongoClient } = require("mongodb");

// Connection URL
const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.fpthpdj.mongodb.net/?retryWrites=true&w=majority`;
const dbName = process.env.MONGODB_DATABASE;
let collection;

(async () => {
  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected successfully to MongoDB Cloud Server");
  const db = client.db(dbName);
  collection = db.collection("users");
})();

router.get("/", (req, res) => {
  res.send(`Backend is running...`);
});

router.get("/nfts/:collectionAddress/:walletAddress", async (req, res) => {
  // test address : 0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85
  try {
    const chain = EvmChain.GOERLI;
    const address = req.params.walletAddress;
    const nftContractAddress = req.params.collectionAddress.toLowerCase();

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });

    console.log(response?.result);

    const nfts =
      response?.result.filter((nft) => {
        console.log(nft.tokenAddress.lowercase, nftContractAddress);
        return nft.tokenAddress.lowercase === nftContractAddress;
      }) || [];

    console.log(nfts);

    res.send(nfts);
  } catch (e) {
    console.error(e);
    res.send([]);
  }
});

router.get("/users/:walletAddress", async (req, res) => {
  const walletAddress = req.params.walletAddress.toLowerCase();
  const findResult = await collection.find({ walletAddress }).toArray();
  res.send(findResult.length ? findResult[0] : {}).status(204);
});
router.post("/users/:walletAddress", async (req, res) => {
  const walletAddress = req.params.walletAddress.toLowerCase();
  let result = await collection.insertOne({ ...req.body, walletAddress });
  res.send(result);
});
router.put("/users/:walletAddress", async (req, res) => {
  const walletAddress = req.params.walletAddress.toLowerCase();
  // console.log(req.body);
  delete req.body._id;
  let result = await collection.updateOne(
    { walletAddress },
    { $set: req.body }
  );
  res.send(result);
});
router.delete("/users/:walletAddress", async (req, res) => {
  const walletAddress = req.params.walletAddress.toLowerCase();
  const deleteResult = await collection.deleteMany({ walletAddress });
  res.send(deleteResult);
});

module.exports = router;
