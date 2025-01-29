const errorMessages = {
  ethereum: {
    invalidAddress: "Invalid Ethereum address.",
    invalidUsdtAddress:
      "Invalid USDT contract address. Please check and try again.",
    fetchError: "Error fetching Ethereum USDT balance. Please try again later.",
  },
  tron: {
    invalidAddress: "Invalid Tron address.",
    invalidAccountData: "Invalid account data response from Tron API.",
    noAssetsFound: "The provided address does not hold any USDT tokens.",
    fetchError: "Error fetching Tron USDT balance. Please try again later.",
    tronAddressError: "Invalid Tron address. Please provide a valid address.",
    invalidUsdtContractAddress:
      "Invalid USDT contract address. Please check and try again.",
  },
  general: {
    missingParams:
      "Both 'address' and 'network' query parameters are required.",
    unsupportedNetwork:
      "Unsupported blockchain network. Please choose 'ethereum' or 'tron'.",
  },
};

module.exports = errorMessages;
