pragma solidity ^0.4.13;


import './BasicToken.sol';
import './ERC20.sol';


/**
 * @title Standard ERC20 token
 *
 * @dev Implementation of the basic standard token.
 * @dev https://github.com/ethereum/EIPs/issues/20
 * @dev Based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 *
 * created by OpenZeppelin 
 * https://github.com/OpenZeppelin/zeppelin-solidity
 * changed by IAM <DEV> (Elky Bachtiar)
 * https://iamdeveloper.io
 * Changes made base on ERC20 Token Stadard and Solidity version 0.4.13
 * https://theethereum.wiki/w/index.php/ERC20_Token_Standard
 */
contract StandardToken is ERC20, BasicToken {

  mapping (address => mapping (address => uint256)) allowed;


  /**
   * @dev Transfer tokens from one address to another
   * @dev change because Full compliance to ERC-20 and predictable behavior
   * https://docs.google.com/presentation/d/1sOuulAU1QirYtwHJxEbCsM_5LvuQs0YTbtLau8rRxpk/edit#slide=id.p24
   * @param _from address The address which you want to send tokens from
   * @param _to address The address which you want to transfer to
   * @param _value uint256 the amout of tokens to be transfered
   */
  function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
    
    require(allowed[_from][msg.sender] >= _value && balances[_from] >= _value );

    var _allowance = allowed[_from][msg.sender];

    allowed[_from][msg.sender] = _allowance.sub(_value);

    if (_value > 0 && _from != _to) {
      balances[_to] = balances[_to].add(_value);
      balances[_from] = balances[_from].sub(_value);
      Transfer(_from, _to, _value);
    }
    return true;
  }

  /**
   * @dev Aprove the passed address to spend the specified amount of tokens on behalf of msg.sender.
   * @param _spender The address which will spend the funds.
   * @param _value The amount of tokens to be spent.
   */
  function approve(address _spender, uint256 _value) returns (bool success) {

    // To change the approve amount you first have to reduce the addresses`
    //  allowance to zero by calling `approve(_spender, 0)` if it is not
    //  already 0 to mitigate the race condition described here:
    //  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
    require((_value == 0) || (allowed[msg.sender][_spender] == 0));

    allowed[msg.sender][_spender] = _value;
    Approval(msg.sender, _spender, _value);
    return true;
  }

  /**
   * @dev Function to check the amount of tokens that an owner allowed to a spender.
   * @param _owner address The address which owns the funds.
   * @param _spender address The address which will spend the funds.
   * @return A uint256 specifing the amount of tokens still avaible for the spender.
   */
  function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
    return allowed[_owner][_spender];
  }

}
