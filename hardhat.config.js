const { task } = require("hardhat/config");

require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@openzeppelin/hardhat-upgrades");

task("deploy", "Deploy contract").setAction(async () => {
  const deploy = require("./scripts/deploy");
  await deploy();
});

task("deploy-checker", "Deploy BalanceChecker contract").setAction(async () => {
  const deploy = require("./scripts/deploy-checker");
  await deploy();
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "kroma",
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    kroma: {
      chainId: 255,
      url: "https://api.kroma.network",
      accounts: [process.env.PRIVATE_KEY],
      gasMultiplier: 1,
    },
    kroma_sepolia: {
      chainId: 2358,
      url: "https://api.sepolia.kroma.network",
      accounts: [process.env.PRIVATE_KEY],
      gasMultiplier: 1,
    }
  },
  etherscan: {
    apiKey: {
      kroma: process.env.KROMA_API_KEY,
      kroma_sepolia: process.env.KROMA_API_KEY,
    },
    customChains: [
      {
        network: "kroma",
        chainId: 255,
        urls: {
          apiURL: "https://api.kromascan.com/api",
          browserURL: "https://kromascan.com/",
        },
      },
      {
        network: "kroma_sepolia",
        chainId: 2358,
        urls: {
          apiURL: "https://api-sepolia.kromascan.com/api",
          browserURL: "https://sepolia.kromascan.com/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false
  }
};
