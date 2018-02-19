var COALITE1Token = artifacts.require("./COALITE1Token.sol");
var ExampleReceiverContract = artifacts.require("./ExampleReceiverContract.sol");

module.exports = function(deployer, network, accounts) {
    //Set Example Contract's accepted token to Coalite Token
    ExampleReceiverContract.deployed()
    .then(function(instance) {               
        instance.setTokenAddress(COALITE1Token.address, {from: accounts[0]});
    });
};