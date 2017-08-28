pragma solidity ^0.4.15;

import '../../contracts/token/Standard23Token.sol';

// mock class using Standard23Token
contract StandardTokenMock is Standard23Token {

  function StandardTokenMock(address initialAccount, uint initialBalance) {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}
