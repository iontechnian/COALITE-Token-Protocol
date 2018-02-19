  ## COALITE Token Protocol

  The COALITE Protocol is based off the ERC-223 standard but with further implementations of the ERC-20 functions to ensure backwards-compatability, as well as managing the tokens allowed to call the Receiver. COALITE enables the creation of tokens that posess all the capabilities of an ERC-20 token, and providing a convinient method to utilize these tokens with a contract, allowing a contract to react to receiving tokens and choosing wether or not to accept the incoming tokens.
  
  ### Components in the Protol 
  
  COALITE consists of two main parts as well as a third optional part:
  
  - [COALITE Token](https://github.com/iontechnian/COALITE-Token-Protocol/blob/master/contracts/COALITE/COALITE1Token.sol): This contract is ready to be used as-is to build a COALITE token.
  - [COALITE Receiver](https://github.com/iontechnian/COALITE-Token-Protocol/blob/master/contracts/COALITE/COALITE1Receiver.sol): This should be inherited by whatever contract intended to receive tokens.
  - [COALITE Token Database](https://github.com/iontechnian/COALITE-Token-Protocol/blob/master/contracts/COALITE/COALITEDataBase.sol): This is an optional contract. It can be used if you plan on accepting more than one COALITE token.
  
  ## How it works
  
  ### COALITE Token
  ```solidity
    function transfer(address _to, uint _value, bytes _data) public returns (bool success)
  ```
  
  The `transfer()` function is used to transfer tokens between addresses. This not only works for regular user addresses but will also call the tokenReceived function on the receiving address if it's a COALITE Receiver. This function can be given data in the form of a byte array to be used by the receiving contract.
  
  There are alternate transfer functions available, as well as transferFrom variants:
  
  ```solidity
    function transfer(address _to, uint _value) public returns (bool success)
  ```
  Works the same way as the transfer mentioned above but doesn't require data.
  
  ```solidity
    function transferFrom(address _from, address _to, uint256 _value, bytes _data) public returns (bool success)
  ```
  Allows the use of an allowance to send tokens, as well as being able to provide data in the form of a byte array.
  
  ```solidity
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
  ```
  Works the same way as the transferFrom above but doesn't require data.
  
  ### COALITE Receiver
  ```solidity
    function tokenReceived(address _sender, uint _value, bytes _data) public returns (bool)
  ```
  
  The `tokenReceived()` function is called by a token when a transfer function was called with the receiver being a COALITE Receiver contract. This method is meant to handle incoming transfers from accepted tokens, and will return false if the calling address is not an accepted token. Once this function verifies that the calling token is accepted it will call the following function, which is to implemented in the inheriting contract with custom logic:
  
  ```solidity
    function _tokenReceivedInternal(address _token, address _sender, uint _value, bytes _data) internal returns (bool)
  ```
  This functions returns wether or not the transaction was successful: If you return true the transaction is completed and the tokens will be transferred and if you return false the transaction will be aborted and no tokens will be transferred, but the gas used for the transaction will still be consumed.
  
