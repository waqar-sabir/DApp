const { ethers } = require("hardhat");

async function main() {
  // Compile the contract
  const ERC20Token = await ethers.getContractFactory("ERC20Token");

  // Deploy the contract
  const erc20Token = await ERC20Token.deploy("My Token", "MTK", ethers.utils.parseEther("100000000"));

  // Wait for the contract to be deployed
  await erc20Token.deployed();

  console.log("ERC20Token deployed to:", erc20Token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
