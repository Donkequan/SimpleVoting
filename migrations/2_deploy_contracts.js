const Voting = artifacts.require("Voting");

module.exports = function(deployer) {
  deployer.deploy(Voting, [111, 222, 333], {gas: 1000000});
};
