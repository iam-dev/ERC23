pragma solidity ^0.4.13;


import './ERC20Basic.sol';


/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 *
 * created by OpenZeppelin 
 * https://github.com/OpenZeppelin/zeppelin-solidity
 * changed by Elky Bachtiar (IaM <DEV>)
 * https://iamdeveloper.io
 * Changes made base on ERC20 Token Stadard and Solidity version 0.4.13
 * https://theethereum.wiki/w/index.php/ERC20_Token_Standard
 */
contract ERC20 is ERC20Basic {
  function allowance(address _owner, address _spender) constant returns (uint256 remaining);
  function transferFrom(address _from, address _to, uint256 _value) returns (bool success);
  function approve(address _spender, uint256 _value) returns (bool success);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}
