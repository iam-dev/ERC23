pragma solidity ^0.4.11;


//import '../../contracts/token/StandardToken.sol';
import '../../installed_contracts/zeppelin-solidity/contracts/token/StandardToken.sol';


// mock class using StandardToken
contract StandardTokenMock is StandardToken {

  function StandardTokenMock(address initialAccount, uint256 initialBalance) {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}
