// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SeedStorage {
    struct Seed {
        string seedName;
        bool verified;
    }

    mapping(uint256 => Seed) private seedList;
    address private authorizedUser;

    constructor() {
        authorizedUser = address(0xEaeDE97C59C94dA5460F77Da09f97F6A7DCf21a7);
    }

    modifier onlyAuthorizedUser() {
        require(isAuthorizedUser(), "Only authorized users can call this function.");
        _;
    }

    function isAuthorizedUser() private view returns (bool) {
        return tx.origin == authorizedUser;
    }

    function addSeed(uint256 _seedId, string memory _seedName) public onlyAuthorizedUser {
        seedList[_seedId] = Seed(_seedName, true);
    }

    function isSeedVerified(uint256 _seedId) public view returns (bool) {
        return seedList[_seedId].verified;
    }

    function getSeedDetails(uint256 _seedId) public view returns (string memory seedName) {
        require(isSeedVerified(_seedId), "Seeds are not verified.");
        return seedList[_seedId].seedName;
    }
}
