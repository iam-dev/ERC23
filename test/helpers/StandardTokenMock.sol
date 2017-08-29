pragma solidity ^0.4.15;

//import '../../installed_contracts/zeppelin-solidity/contracts/token/StandardToken.sol';
import '../../contracts/Standard23Token.sol';

// mock class using Standard23Token
contract StandardTokenMock is Standard23Token {

  function StandardTokenMock(address initialAccount, uint initialBalance) {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}
