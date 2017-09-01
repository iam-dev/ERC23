pragma solidity ^0.4.15;

/**
 * @title Utils 
 * @dev Utilities & Common Modifiers for ERC23
 * created by IAM <DEV> (Elky Bachtiar) 
 * https://www.iamdeveloper.io
 */
contract Utils {

    /**
        constructor
    */
    function Utils() {
    }

    // verifies that an amount is greater than zero
    modifier greaterThanZero(uint256 _amount) {
        require(_amount > 0);
        _;
    }

    // validates an address - currently only checks that it isn't null
    modifier validAddress(address _address) {
        require(_address != 0x0 || _address != address(0) || _address != 0);
        _;
    }

    // validates multiple addresses - currently only checks that it isn't null
    modifier validAddresses(address _address, address _anotherAddress) {
        require((_address != 0x0         || _address != address(0)        || _address != 0 ) &&
                ( _anotherAddress != 0x0 || _anotherAddress != address(0) || _anotherAddress != 0)
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
