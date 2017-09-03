pragma solidity ^0.4.15;


 /**
 * @title Client Token used to create a new Token base on Standard23Token for our Client 
 *
 * Created by IaM <DEV> (Elky Bachtiar) 
 * https://www.iamdeveloper.io
 *
 */

import './Standard23Token.sol';
import '../installed_contracts/zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../installed_contracts/zeppelin-solidity/contracts/math/SafeMath.sol';

contract ClientStandard23Token is Ownable, Standard23Token {
	using SafeMath for uint256;

    bytes32 public name;
    bytes32 public symbol;
    uint256 public decimals;

    address public owner;


    function ClientStandard23Token(address _centralAdmin, uint256 _initialBalance, bytes32 _name, bytes32 _symbol, uint256 _decimals) {
        if (_centralAdmin != 0) {
          owner = _centralAdmin;
        } else {
          owner = msg.sender;
        }
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        balances[this] = _initialBalance; // balance of Token address will be 100% of the HME company shares when initialize the contract 
        totalSupply = _initialBalance;
    }

    function setName(bytes32 _name) onlyOwner{
        name = _name;
    }

    function setSymbol(bytes32 _symbol) onlyOwner {
        symbol = _symbol;
    }

    function setDecimals(uint256 _decimals) onlyOwner {
        decimals = _decimals;
    }

    function addSupply(uint256 _amount) onlyOwner {
    	balances[this] = balances[this].add(_amount);
    	totalSupply = totalSupply.add(_amount);
    }

    function subSupply(uint256 _amount) onlyOwner {
    	balances[this] = balances[this].sub(_amount);
    	totalSupply = totalSupply.sub(_amount);
    }
}
