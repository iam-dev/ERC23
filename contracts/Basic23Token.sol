pragma solidity ^0.4.15;

import './Utils.sol';
import './interface/ERC23Basic.sol';
import './interface/ERC23Receiver.sol';
import '../installed_contracts/zeppelin-solidity/contracts/token/BasicToken.sol';

 /**
 * @title Basic token ERC23 
 * @dev Basic version of StandardToken, with no allowances
 *
 * created by IAM <DEV> (Elky Bachtiar) 
 * https://www.iamdeveloper.io
 * Changes made base on ERC20 Token Stadard and Solidity version 0.4.13
 * https://theethereum.wiki/w/index.php/ERC20_Token_Standard
 */
contract Basic23Token is Utils, ERC23Basic, BasicToken {
  
    /**
    * @dev transfer token for a specified address
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred
    * @param _data is arbitrary data sent with the token transferFrom. Simulates ether tx.data
    * @return bool successful or not
    */
    function transfer(address _to, uint _value, bytes _data) 
        validAddress(_to) 
        greaterThanZero(_value)
        returns (bool success)
    {
        /// Ensure Sender has enough balance to send amount and ensure the sent _value is greater than 0
        // and Detect balance overflow
        require(balances[msg.sender] >= _value &&
                balances[_to].add(_value) > balances[_to]);
        require(super.transfer(_to, _value));

        if (isContract(_to)){
          return contractFallback(msg.sender, _to, _value, _data);
        }
        return true;
    }

    /**
    * @dev transfer token for a specified address
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    */
    function transfer(address _to, uint256 _value) 
        validAddress(_to) 
        greaterThanZero(_value)
        returns (bool success)
    {
        /// Ensure Sender has enough balance to send amount and ensure the sent _value is greater than 0
        // and Detect balance overflow
        require(balances[msg.sender] >= _value &&
                balances[_to].add(_value) > balances[_to]);
        
        return transfer(_to, _value, new bytes(0));
    }

    /**
    * @dev Gets the balance of the specified address.
    * @param _owner The address to query the the balance of. 
    * @return An uint256 representing the amount owned by the passed address.
    */
    function balanceOf(address _owner) 
        validAddress(_owner) 
        constant returns (uint256 balance)
    {
        return super.balanceOf(_owner);
    }

    //function that is called when transaction target is a contract
    function contractFallback(address _origin, address _to, uint _value, bytes _data) internal returns (bool success) {
        ERC23Receiver reciever = ERC23Receiver(_to);
        return reciever.tokenFallback(msg.sender, _origin, _value, _data);
    }

    //assemble the given address bytecode. If bytecode exists then the _addr is a contract.
    function isContract(address _addr) internal returns (bool is_contract) {
        // retrieve the size of the code on target address, this needs assembly
        uint length;
        assembly { length := extcodesize(_addr) }
        return length > 0;
    }
}
