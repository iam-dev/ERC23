module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      host: "localhost",
      port: 8546,
      from: "0x0bE9FC0FC5d2696edF93F9256F6871217695B4B6",
      network_id: "*" // Match any network id
    },
  }
};
