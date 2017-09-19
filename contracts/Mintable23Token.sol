pragma solidity ^0.4.11;


import './Basic23Token.sol';
import '../installed_contracts/zeppelin-solidity/contracts/ownership/Ownable.sol';



/**
 * @title Mintable token ERC23
 * @dev Simple ERC23 Token example, with mintable token creation
 * Based on code by TokenMarketNet: https://github.com/TokenMarketNet/ico/blob/master/contracts/MintableToken.sol
* Created by IaM <DEV> (Elky Bachtiar) 
 * https://www.iamdeveloper.io
 */

contract Mintable23Token is Basic23Token, Ownable {
    event Mint(address indexed to, uint256 amount);
    event MintFinished();

    bool public mintingFinished = false;


    modifier canMint() {
        require(!mintingFinished);
        _;
    }

    /**
    * @dev Function to mint tokens
    * @param _to The address that will receive the minted tokens.
    * @param _amount The amount of tokens to mint.
    * @return A boolean that indicates if the operation was successful.
    */
    function mint(address _to, uint256 _amount) onlyOwner canMint returns (bool) {
        totalSupply = totalSupply.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        Mint(_to, _amount);
        Transfer(0x0, _to, _amount);
        return true;
    }

    /**
    * @dev Function to stop minting new tokens.
    * @return True if the operation was successful.
    */
    function finishMinting() onlyOwner returns (bool) {
        mintingFinished = true;
        MintFinished();
        return true;
    }
}
