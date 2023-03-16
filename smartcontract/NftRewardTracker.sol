// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NftRewardTrackerExclusive {
    mapping(uint => bool) private claimed;
    mapping(uint => bool) private claimable;
    address private nftContract;
    uint public shippingFee;
    address public owner;

    event NFTsClaimed(address indexed owner, uint[] indexed nftIds);
    event Withdrawn(uint amount);
    event ShippingFee_Set(uint shippingFee);
    event ClaimableIDs_Set(uint[] claimableIDs);

    modifier onlyOwner() {
        require(msg.sender == owner, "Permission denied: only owner");
        _;
    }

    constructor(address _nftContract) {
        owner = msg.sender;
        nftContract = _nftContract;
    }

    function getContractAddress() public view returns (address) {
        return nftContract;
    }

    function claim(uint[] memory nftIds) public payable {
        require(msg.value >= shippingFee, "You must pay the shipping fee!!!");

        IERC721 nft = IERC721(nftContract);

        for (uint i = 0; i < nftIds.length; i++) {
            uint nftId = nftIds[i];
            require(!claimed[nftId], "NFT already claimed");
            require(claimable[nftId], "NFT not claimable");
            require(
                nft.ownerOf(nftId) == msg.sender,
                "Caller is not the owner of the NFT"
            );
            claimed[nftId] = true;
        }

        emit NFTsClaimed(msg.sender, nftIds);
    }

    function isClaimed(uint nftId) public view returns (bool) {
        return claimed[nftId];
    }

    function isClaimable(uint nftId) public view returns (bool) {
        return claimable[nftId];
    }

    function setShippingFee(uint _shippingFee) public onlyOwner {
        require(_shippingFee != 0, "Invalid Shipping fee");
        require(nftContract != address(0), "Invalid Contract Address");
        require(_shippingFee != shippingFee, "Already set fee");
        shippingFee = _shippingFee;

        emit ShippingFee_Set(shippingFee);
    }

    function setClaimableIDs(uint[] memory _claimableIDs) public onlyOwner {
        for (uint i = 0; i < _claimableIDs.length; i++) {
            claimable[_claimableIDs[i]] = true;
        }

        emit ClaimableIDs_Set(_claimableIDs);
    }

    function withdraw() public onlyOwner {
        uint amount = address(this).balance;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(amount);
    }
}