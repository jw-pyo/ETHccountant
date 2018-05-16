var Smallbank = artifacts.require("./Smallbank.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Smallbank);
};
