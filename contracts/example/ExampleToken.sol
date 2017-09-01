pragma solidity ^0.4.15;

import "../Standard23Token.sol";

/**
 * @title ExampleReceiver 
 *
 * created by IAM <DEV> (Elky Bachtiar) 
 * https://www.iamdeveloper.io
 */

contract ExampleToken is Standard23Token {
  
    function ExampleToken(uint initialBalance) {
        balances[msg.sender] = initialBalance;
        totalSupply = initialBalance;
        // Ideally call token fallback here too
    }
}