pragma solidity ^0.4.11;

import '../../installed_contracts/zeppelin-solidity/contracts/token/BasicToken.sol';

// mock class using BasicToken
contract BasicTokenMock is BasicToken {

  function BasicTokenMock(address initialAccount, uint initialBalance) {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}
