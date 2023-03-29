const { ethers } = require("hardhat");

async function main() {
  // Compile the contract
  const TokenFactory = await ethers.getContractFactory("TokenFactory");

  // Deploy the contract
  const tokenFactory = await TokenFactory.deploy();

  // Wait for the contract to be deployed
  await tokenFactory.deployed();

  console.log("Token Factory deployed to:", tokenFactory.address);

  console.log("Waiting for 5 confirmations...");
  await tokenFactory.deployTransaction.wait(5);

  try {
    await run("verify:verify", { address: tokenFactory.address });
    console.log(`${tokenFactory.address} verified`);
  } catch (ex) {
    if (ex.message.includes("already verified")) {
      console.log(`${tokenFactory.address} already verified`);
    } else {
      console.error(`${tokenFactory.address} verification failed with reason: ${ex.message}`);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
