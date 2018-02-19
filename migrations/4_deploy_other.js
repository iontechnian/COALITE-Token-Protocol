var OtherCOALITE = artifacts.require("./OtherCOALITE.sol");

module.exports = function(deployer, network, accounts) {
    //Deploy a second instance of Coalite
    deployer.deploy(OtherCOALITE, 'Other', 'Oth', 8, 100000000000, {from: accounts[0], gas: 1612646}); 
}