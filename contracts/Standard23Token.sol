
pragma solidity ^0.4.15;

import './Utils.sol';
import './interface/ERC23.sol';
import './interface/ERC23Receiver.sol';
import './Basic23Token.sol';
import '../installed_contracts/zeppelin-solidity/contracts/token/StandardToken.sol';

/**
 * @title Standard ERC23 token
 * @dev Implementation of the basic standard token ERC23.
 *
 * created by IAM <DEV> (Elky Bachtiar) 
 * https://www.iamdeveloper.io
 * Changes made base on ERC20 Token Stadard and Solidity version 0.4.13
 * https://theethereum.wiki/w/index.php/ERC20_Token_Standard
 */
contract Standard23Token is Utils, ERC23, Basic23Token, StandardToken {

    /**
     * @dev Transfer tokens from one address to another
     * @dev Full compliance to ERC-20 and predictable behavior
     * https://docs.google.com/presentation/d/1sOuulAU1QirYtwHJxEbCsM_5LvuQs0YTbtLau8rRxpk/edit#slide=id.p24
     * 
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value uint256 the amout of tokens to be transfered
     * @param _data is arbitrary data sent with the token transferFrom. Simulates ether tx.data
     * @return bool successful or not
   */
    function transferFrom(address _from, address _to, uint256 _value, bytes _data)
        validAddresses(_from, _to) 
        notThis(_to)
        greaterThanZero(_value)
        returns (bool success)
    {
        // Ensure _from has enough balance to send amount 
        // and ensure the send _value is greater than 0
        // and ensure allowed[_from][msg.sender] is greate or equal to send amount to send
        // and Detect balance overflow
        require(balances[_from] >= _value && allowed[_from][msg.sender] >= _value &&
                balances[_to].add(_value) > balances[_to]
        );

        if (_value > 0 && _from != _to) {
            require(super.transferFrom(_from, _to, _value)); // do a normal token transfer
            if (isContract(_to)) {
                return contractFallback(_from, _to, _value, _data);
            }
        }
        return true;
    }


    /**
     * @dev Transfer tokens from one address to another
     * @dev Full compliance to ERC-20 and predictable behavior
     * https://docs.google.com/presentation/d/1sOuulAU1QirYtwHJxEbCsM_5LvuQs0YTbtLau8rRxpk/edit#slide=id.p24
     * 
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value uint256 the amout of tokens to be transfered
     * @return bool successful or not
     */
    function transferFrom(address _from, address _to, uint256 _value)
        validAddresses(_from, _to) 
        greaterThanZero(_value)
        returns (bool success)
    {
        // Ensure _from has enough balance to send amount 
        // and ensure the send _value is greater than 0
        // and ensure allowed[_from][msg.sender] is greate or equal to send amount to send
        // and Detect balance overflow
        require(
                balances[_from] >= _value 
                && _value > 0
                && allowed[_from][msg.sender] >= _value
                && balances[_to].add(_value) > balances[_to]
        );

        return transferFrom(_from, _to, _value, new bytes(0));
    }

    //compareAndApprove workaround is fixed by OpenZeppelin!!!
    // With the OpenZeppelin ERC20 is now possible toincrease and decrease approval
    
    // A vulernability of the approve method in the ERC20 standard was identified by
    // Mikhail Vladimirov and Dmitry Khovratovich here:
    // https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM
    // It's better to use this method which is not susceptible to over-withdrawing by the approvee.
    /// @param _spender The address to approve
    /// @param _currentValue The previous value approved, which can be retrieved with allowance(msg.sender, _spender)
    /// @param _newValue The new value to approve, this will replace the _currentValue
    /// @return bool Whether the approval was a success (see ERC20's `approve`)
    //function compareAndApprove(address _spender, uint256 _currentValue, uint256 _newValue) public returns(bool){
    //    require(allowed[msg.sender][_spender] == _currentValue);
    //    return approve(_spender, _newValue);
   // }
}