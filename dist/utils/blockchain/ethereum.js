const { ethers } = require("ethers");
const errorMessages = require("../../common/errorMessages");
require("dotenv").config();

const config = {
  ethereum: {
    providerUrl: process.env.ETH_PROVIDER_URL,
    usdtAddress: process.env.ETH_USDT_ADDRESS,
    usdtAbi: JSON.parse(process.env.ETH_USDT_ABI),
  },
};

const isValidEthereumAddress = (address) => ethers.isAddress(address);
const validateConfig = () => {
  const { usdtAddress } = config.ethereum;

  if (!usdtAddress || !isValidEthereumAddress(usdtAddress)) {
    throw new Error(errorMessages.ethereum.invalidUsdtAddress);
  }
};

const getEthereumUSDTBalance = async (address) => {
  const { providerUrl, usdtAddress, usdtAbi } = config.ethereum;

  validateConfig();

  const provider = new ethers.JsonRpcProvider(providerUrl);

  let usdtContract;
  try {
    usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
  } catch (error) {
    throw new Error(errorMessages.ethereum.invalidUsdtAddress);
  }

  if (!isValidEthereumAddress(address)) {
    throw new Error(errorMessages.ethereum.invalidAddress);
  }

  try {
    const balance = await usdtContract.balanceOf(address);
    return ethers.formatUnits(balance, 6);
  } catch (error) {
    console.error("Error fetching Ethereum USDT balance:", error);

    if (error.code === "BAD_DATA") {
      throw new Error(errorMessages.ethereum.invalidUsdtAddress);
    }

    throw new Error(errorMessages.ethereum.fetchError);
  }
};

module.exports = { getEthereumUSDTBalance };
