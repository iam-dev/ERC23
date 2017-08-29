pragma solidity ^0.4.15;

//import '../../installed_contracts/zeppelin-solidity/contracts/token/BasicToken.sol';
import '../../contracts/Basic23Token.sol';

// mock class using BasicToken
contract BasicTokenMock is Basic23Token {

  function BasicTokenMock(address initialAccount, uint initialBalance) {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}
