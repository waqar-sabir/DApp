// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface MintableInterface {
    function mintInit(address to, uint256 amount) external;
}
