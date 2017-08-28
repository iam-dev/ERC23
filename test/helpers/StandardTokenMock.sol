pragma solidity ^0.4.13;

import '../../installed_contracts/zeppelin-solidity/contracts/token/StandardToken.sol';

// mock class using StandardToken
contract StandardTokenMock is StandardToken {

  function StandardTokenMock(address initialAccount, uint initialBalance) {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}
