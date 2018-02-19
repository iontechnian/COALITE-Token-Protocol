pragma solidity ^0.4.17;

import './COALITE/COALITE1Receiver.sol';

contract ExampleReceiverContract is COALITE1Receiver {

    mapping(address => uint) public amountPaid;

    function ExampleReceiverContract() public {

        owners[msg.sender] = Permissions(true, 10);
    }

    function _tokenReceivedInternal(address _token, address _sender, uint _value, bytes _data) internal returns (bool) {

        amountPaid[_sender] += _value;
        return true;
    }
}