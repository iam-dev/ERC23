pragma solidity ^0.4.15;


 /**
 * @title UpgradeableStandard23Token
 *
 * Created by IaM <DEV> (Elky Bachtiar) 
 * https://www.iamdeveloper.io
 *
 */

import './Utils.sol';
import './interface/Upgradeable23Token.sol';
import './Standard23Token.sol';
import '../installed_contracts/zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../installed_contracts/zeppelin-solidity/contracts/math/SafeMath.sol';

contract UpgradeableStandard23Token is Utils, Ownable, Upgradeable23Token, Standard23Token {
    using SafeMath for uint256;

    function setName(bytes32 _name) onlyOwner returns (bytes32 newName) {
        assert(_name != name);
        name = _name;
        return name;
    }

    function setSymbol(bytes32 _symbol) onlyOwner returns (bytes32 newSymbol)
    {
        assert(_symbol != symbol);
        symbol = _symbol;
        return symbol;
    }

    function setDecimals(uint256 _decimals) onlyOwner returns (uint256 newDecimals) {
        assert(_decimals != decimals);
        decimals = _decimals;
        return decimals;
    }

    function addSupply(uint256 _amount) 
        greaterThanZero(_amount) 
        onlyOwner 
        returns (bool success)
    {
        require(balances[msg.sender].add(_amount) > balances[msg.sender] && 
                totalSupply.add(_amount) > totalSupply);

        balances[msg.sender] = balances[msg.sender].add(_amount);
        totalSupply = totalSupply.add(_amount);
        return true;
    }

    function subSupply(uint256 _amount) 
        greaterThanZero(_amount) 
        onlyOwner 
        returns (bool success)
    {
        require(balances[msg.sender].add(_amount) > balances[msg.sender] && 
                totalSupply.sub(_amount) < totalSupply);
        
        balances[msg.sender] = balances[msg.sender].sub(_amount);
        totalSupply = totalSupply.sub(_amount);
        return true;
    }
}
