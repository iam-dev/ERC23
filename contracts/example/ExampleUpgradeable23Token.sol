pragma solidity ^0.4.15;


 /**
 * @title Holdme Token 
 *
 * Created by IaM <DEV> (Elky Bachtiar) 
 * https://www.iamdeveloper.io
 *
 * Derived from ERC23 token 
 * https://github.com/iam-dev/ERC23
 *
 * ERC23 token derived from ERC20 OpenZeppelin Solidity
 * https://github.com/OpenZeppelin/zeppelin-solidity
 *
 */

import '../UpgradeableStandard23Token.sol';
import '../../installed_contracts/zeppelin-solidity/contracts/ownership/Ownable.sol';
//import '../installed_contracts/zeppelin-solidity/contracts/math/SafeMath.sol';


contract ExampleUpgradeable23Token is Ownable, UpgradeableStandard23Token {

  address public owner;


  function ExampleUpgradeable23Token(address _centralAdmin, uint256 _initialBalance, bytes32 _name, bytes32 _symbol, uint256 _decimals) {
    if (_centralAdmin != 0) {
      owner = _centralAdmin;
    } else {
      owner = msg.sender;
    }
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    balances[owner] = _initialBalance; // balance of Token address will be 100% of the HME company shares when initialize the contract 
    totalSupply = _initialBalance;
  }

}
