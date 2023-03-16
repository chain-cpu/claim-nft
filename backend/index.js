require("dotenv").config();

const express = require("express");
var cors = require("cors");
const app = express();

const port = process.env.PORT;

const router = require("./routes");

const Moralis = require("moralis").default;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
    // ...and any other configuration
  });
  console.log(`Backend app listening on port ${port}`);
});
