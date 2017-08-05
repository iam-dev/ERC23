pragma solidity ^0.4.13;

/**
 * @title Valid 
 * @dev Validation for ERC23
 * created by IAM <DEV> (Elky Bachtiar) 
 * https://iamdeveloper.io
 * Changes made base on ERC20 Token Stadard and Solidity version 0.4.13
 * https://theethereum.wiki/w/index.php/ERC20_Token_Standard
 */
contract Valid {

  // validates an address - currently only checks that it isn't null
  modifier validAddress(address _address) {
    require(_address != 0x0 || _address != address(0) || _address != 0);
    _;
  }

  // validates multiple addresses - currently only checks that it isn't null
  modifier validAddresses(address _address, address _anotherAddress) {
    require((_address != 0x0 || _address != address(0) || _address != 0 ) 
        &&  ( _anotherAddress != 0x0 || _anotherAddress != address(0) || _anotherAddress != 0)
    );
    _;
  }

  // validates an uint256 input - currently only checks that it isn't empty
  modifier validInputUint256(uint256 _input) { 
   bytes[] memory tempInput = new bytes[](_input);
   require(tempInput[0].length != 0);
    _; 
  }

  // validates an bytes input - currently only checks that it isn't empty
  modifier validInputBytes(bytes _input) { 
    bytes memory tempInput = bytes(_input);
    require(tempInput.length != 0);
    _; 
  }
}
