pragma solidity ^0.4.15;

import '../../contracts/token/Basic23Token.sol';

// mock class using BasicToken
contract BasicTokenMock is Basic23Token {

  function BasicTokenMock(address initialAccount, uint initialBalance) {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}
