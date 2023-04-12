const { ethers, upgrades } = require('hardhat');
const { expect } = require("chai");

describe('Token Factory Deployment', function () {
  let contract;
  let owner;
  let minter;
  const name = "My Token";
  const symbol = "MTK";

  beforeEach(async () => {
    const tokenFactory = await ethers.getContractFactory("TokenFactory");
    contract = await tokenFactory.deploy();
    [owner, minter] = await ethers.getSigners();
  });
  it('should initialize the contract with the correct values', async function () {
    await contract.initialize(name, symbol);

    expect(await contract.name()).to.be.equal(name);
    expect(await contract.symbol()).to.be.equal(symbol);
  });
  it("should allow minters to mint new tokens", async function () {
    const defaultAdminRole = await contract.DEFAULT_ADMIN_ROLE();
    await contract.connect(minter).grantRole(defaultAdminRole, minter.address);
    const minterRole = await contract.MINTER_ROLE();
    await contract.connect(minter).grantRole(minterRole, minter.address);
    await contract.connect(minter).mint(owner.address, 100);
    expect(await contract.balanceOf(owner.address)).to.equal(100);
  });
});