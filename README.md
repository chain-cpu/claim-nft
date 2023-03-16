# claim-nft-trial

## smart contract using solidity

smart contract that stores mapping for each NFT ID of a collection (whether claimed or not?)
can be found here [Goerli](https://goerli.etherscan.io/address/0x7C06F54167c09dEF0B3fF3e80D0d98ceeafC3B6a)

## backend (express)

backend that stores customer details

- How to run
  - Copy `.env.example` to `.env` and fill in the required variables
  - Run `npm install` to install dependencies
  - Run `node index.js` (wait for a second until it connects to DB)

## frontend (using next.js)

simple frontend for users to let users connect their metamask & claim nfts

- How to run
  - Copy `.env.example` to `.env` and fill in the required variables
  - Set your NFT contract address in `next.config.js` file
  - Run `yarn` to install dependencies
  - Run `yarn dev` (wait for a second until it connects to DB)
