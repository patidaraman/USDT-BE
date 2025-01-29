const NETWORK = Object.freeze({
  ETHEREUM: "ethereum",
  TRON: "tron",
});

const SUPPORTED_NETWORKS = Object.values(NETWORK);

module.exports = {
  NETWORK,
  SUPPORTED_NETWORKS,
};
