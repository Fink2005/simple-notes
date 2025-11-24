import  { network } from "hardhat";
const { ethers } = await network.connect({
  network: "sepolia",
});

async function main() {
      const [deployer] = await ethers.getSigners();
      console.log("Deploying contract with the account:", deployer.address);

    const MyToken = await ethers.getContractFactory("SimpleNotes", deployer);
    const contract = await MyToken.deploy({
        from: deployer.address,
      });
    
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("Contract deployed at:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});