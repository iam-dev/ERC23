pragma solidity ^0.4.13;

import '../installed_contracts/zeppelin-solidity/contracts/token/ERC20Basic.sol';

 /**
 * @title ERC23Basic additions to ERC20Basic
 * @dev Simpler version of ERC23 interfaceERC23 additions to ERC20Basic
 * https://github.com/Dexaran/ERC23-tokens
 *
 * Created by IAM <DEV> (Elky Bachtiar) 
 * https://iamdeveloper.io
 */
contract ERC23Basic is ERC20Basic {
  function transfer(address _to, uint256 _value, bytes _data) returns (bool success);
  event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes indexed _data);
  function contractFallback(address _origin, address _to, uint _value, bytes _data) internal returns (bool success);
  function isContract(address _addr) internal returns (bool is_contract);
}
