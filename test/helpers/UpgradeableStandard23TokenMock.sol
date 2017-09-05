pragma solidity ^0.4.15;

import '../../contracts/Standard23Token.sol';
import '../../installed_contracts/zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../../contracts/UpgradeableStandard23Token.sol';


// mock class using UpgradeableStandard23Token
contract UpgradeableStandard23TokenMock is Ownable, Standard23Token {

    function UpgradeableStandard23TokenMock(address _centralAdmin, uint256 _initialBalance, bytes32 _name, bytes32 _symbol, uint256 _decimals) {
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
