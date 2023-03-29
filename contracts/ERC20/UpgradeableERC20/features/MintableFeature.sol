// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract MintableFeature is AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
}
