pragma solidity ^0.4.13;

import '../installed_contracts/zeppelin/contracts/token/ERC20.sol';

 /**
 * @title ERC23 additions to ERC20
* @dev Simpler version of ERC23 interfaceERC23 additions to ERC20
 * https://github.com/Dexaran/ERC23-tokens
 *
 * Created by IAM <DEV> (Elky Bachtiar) 
 * https://iamdeveloper.io
 *
 * @dev compareAndApprove Workaround vulnerability on approve method
 * https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM/edit#
 *
 */
contract ERC23 is ERC20{
  function transferFrom(address _from, address _to, uint256 _value, bytes _data) returns (bool success);
  function compareAndApprove(address _spender, uint256 _currentValue, uint256 _newValue) public returns(bool success);
}
