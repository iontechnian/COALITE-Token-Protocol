var COALITE1Token = artifacts.require("COALITE1Token");
var ExampleReceiverContract = artifacts.require("ExampleReceiverContract");
var OtherCOALITE = artifacts.require("OtherCOALITE");

contract('COALITE1Token', function(accounts) {
    
    var token;
    var receiver;
    var other;

    it("should give creator a defined amount of tokens: 1 000.000 000 00", function() {
        COALITE1Token.deployed()
        .then(function(instance) {
            token = instance;
            return token.balanceOf(accounts[0]);
        })
        .then(function(response) {
            assert.equal(response.valueOf(), 100000000000, "Response does not equal expected value");
        });
    });

    it("should be able to transfer tokens to a Receiver contract", function() {
        ExampleReceiverContract.deployed()
        .then(function(instance) {
            receiver = instance;
            return token.transfer(receiver.address, 1000000000);
        })
        .then(function() {
            return token.balanceOf(accounts[0]);
        })
        .then(function(response) {
            assert.equal(response.valueOf(), 99000000000, "Amount not correctly taken from sender");
            return token.balanceOf(receiver.address);
        })
        .then(function(response) {
            assert.equal(response.valueOf(), 1000000000, "Amount not correctly sent to receiver");
        });
    });

    it("should have called Receiver's tokenReceived function upon transfer", function() {
        receiver.amountPaid(accounts[0])
        .then(function(response) {
            assert.equal(response.valueOf(), 1000000000, "Receiver did not receive function call");
        });
    });

    it("should not accept input from an unaccepted token", function() {
        OtherCOALITE.deployed()
        .then(function(instance) {
            other = instance;
            return other.transfer(receiver.address, 1000000000);
        })
        .then(function () {
            return other.balanceOf(accounts[0]);
        })
        .then(function (response) {
            assert.equal(response.valueOf(), 100000000000, "Unaccepted Token was sent!");
        })
    });
})