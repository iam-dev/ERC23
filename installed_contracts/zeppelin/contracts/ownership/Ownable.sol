pragma solidity ^0.4.13;


/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
*  
 * created by OpenZeppelin 
 * https://github.com/OpenZeppelin/zeppelin-solidity
 * changed by IAM <DEV> (Elky Bachtiar)
 * https://iamdeveloper.io
 * Changes made base on ERC20 Token Stadard and Solidity version 0.4.13
 * https://theethereum.wiki/w/index.php/ERC20_Token_Standard
 */
contract Ownable {
  address public owner;


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() {
    owner = msg.sender;
  }


  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }


  /**
   * @dev Allows the current owner to transfer control of the contract to a _newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function transferOwnership(address _newOwner) onlyOwner {
    require(_newOwner != owner);
    if (_newOwner != address(0)) {
      owner = _newOwner;
    }
  }

}
