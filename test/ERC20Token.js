const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20Token", function () {
  let ERC20Token;
  let myToken;
  let owner;

  beforeEach(async function () {
    ERC20Token = await ethers.getContractFactory("ERC20Token");
    myToken = await ERC20Token.deploy("My Token", "MTK", ethers.utils.parseEther("1000000"));
    await myToken.deployed();
    owner = await myToken.owner();
  });

  it("should have correct name, symbol, and initial supply", async function () {
    expect(await myToken.name()).to.equal("My Token");
    expect(await myToken.symbol()).to.equal("MTK");
    expect(await myToken.totalSupply()).to.equal(ethers.utils.parseEther("1000000"));
  });

  it("should allow owner to mint new tokens", async function () {
    const mintAmount = ethers.utils.parseEther("1000");
    await myToken.connect(owner).mint(owner.address, mintAmount);
    expect(await myToken.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("1001000"));
  });

  it("should not allow non-owner to mint new tokens", async function () {
    const nonOwner = ethers.provider.getSigner(1);
    const mintAmount = ethers.utils.parseEther("1000");
    await expect(myToken.connect(nonOwner).mint(nonOwner.address, mintAmount)).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
