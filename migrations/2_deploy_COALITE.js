var COALITE1Token = artifacts.require("./COALITE1Token.sol");
var ExampleReceiverContract = artifacts.require("./ExampleReceiverContract.sol");

module.exports = function(deployer, network, accounts) {

    //deploy Coalite Token
    deployer.deploy(COALITE1Token, 'Coalite', '💠', 8, 100000000000, {from: accounts[0]})
    .then(function() {
        //Deploy Example Contract
        deployer.deploy(ExampleReceiverContract, {from: accounts[0]})
        .then(function() {
            
        });
    });
};