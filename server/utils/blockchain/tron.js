const axios = require("axios");
const errorMessages = require("../../common/errorMessages");
require("dotenv").config();

const config = {
  tron: {
    providerUrl: process.env.TRON_PROVIDER_URL,
    usdtContractAddress: process.env.TRON_USDT_CONTRACT_ADDRESS,
  },
};

const isValidTronAddress = (address) => /^T[a-zA-Z0-9]{33}$/.test(address);

const getTronUSDTBalance = async (address) => {
  const { providerUrl, usdtContractAddress } = config.tron;
  const tronApiUrl = `${providerUrl}/v1/accounts/${address}`;

  if (!isValidTronAddress(address)) {
    throw new Error(errorMessages.tron.invalidAddress);
  }

  try {
    const { data } = await axios.get(tronApiUrl);
    const accountData = data?.data?.[0];

    if (!accountData) return "0.0";

    const trc20Assets = accountData.trc20 || [];
    const asset = trc20Assets.find((asset) => asset[usdtContractAddress]);

    if (asset) {
      return (asset[usdtContractAddress] / 1e6).toString();
    }

    return "0.0";
  } catch (error) {
    if (error.response) {
      console.error("Tron API Error:", error.response.data);
      if (
        error.response.data.error === "A valid account address is required."
      ) {
        throw new Error(errorMessages.tron.tronAddressError);
      }
    } else {
      console.error("Error fetching Tron USDT balance:", error.message);
    }

    throw new Error(errorMessages.tron.fetchError);
  }
};

module.exports = { getTronUSDTBalance };
