pragma solidity ^0.4.15;


/**
 * @title Upgradeable23Token 
 * @dev Interface for Upgradeable Token
 *
 * Created by IAM <DEV> (Elky Bachtiar) 
 * https://www.iamdeveloper.io
*/
contract Upgradeable23Token {
	bytes32 public name;
    bytes32 public symbol;
    uint256 public decimals;
    
    function setName(bytes32 _name) returns (bytes32 newName);
    function setSymbol(bytes32 _symbol) returns (bytes32 newSymbol);
    function setDecimals(uint256 _decimals) returns (uint256 newDecimals);
    function addSupply(uint256 _amount) returns (bool success);
    function subSupply(uint256 _amount) returns (bool success);
}
