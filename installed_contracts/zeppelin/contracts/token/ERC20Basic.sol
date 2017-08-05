pragma solidity ^0.4.13;


/**
 * @title ERC20Basic
 * @dev Simpler version of ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/179
 *
 * created by OpenZeppelin 
 * https://github.com/OpenZeppelin/zeppelin-solidity
 * changed by Elky Bachtiar (IaM <DEV>)
 * https://iamdeveloper.io
 * Changes made base on ERC20 Token Stadard and Solidity version 0.4.13
 * https://theethereum.wiki/w/index.php/ERC20_Token_Standard
 */
contract ERC20Basic {
  /* This is a slight change to the ERC20 base standard.
    function totalSupply() constant returns (uint256 supply);
    is replaced with:
    uint256 public totalSupply;
    This automatically creates a getter function for the totalSupply.
    This is moved to the base contract since public getter functions are not
    currently recognised as an implementation of the matching abstract
    function by the compiler.
  */
  uint256 public totalSupply;
  function balanceOf(address _owner) constant returns (uint256 balance);
  function transfer(address _to, uint256 _value) returns (bool success);
  event Transfer(address indexed _from, address indexed _to, uint256 _value);
}
