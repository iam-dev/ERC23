/**
 * This smart contract code is Copyright 2017 TokenMarket Ltd. For more information see https://tokenmarket.net
 *
 * Licensed under the Apache License, version 2.0: https://github.com/TokenMarketNet/ico/blob/master/LICENSE.txt
 *
 *
 * changes made by IAM <DEV> (Elky Bachtiar) 
 * https://www.iamdeveloper.io
 */

pragma solidity ^0.4.15;

import "./Basic23Token.sol";
import "./Utils.sol";
import '../installed_contracts/zeppelin-solidity/contracts/ownership/Ownable.sol';
import '../installed_contracts/zeppelin-solidity/contracts/math/SafeMath.sol';

/**
 * Hold tokens for a group investor of investors until the unlock date.
 *
 * After the unlock date the investor can claim their tokens.
 *
 * Steps
 *
 * - Prepare a spreadsheet for token allocation
 * - Deploy this contract, with the sum to tokens to be distributed, from the owner account
 * - Call setInvestor for all investors from the owner account using a local script and CSV input
 * - Move tokensToBeAllocated in this contract using StandardToken.transfer()
 * - Call lock from the owner account
 * - Wait until the freeze period is over
 * - After the freeze time is over investors can call claim() from their address to get their tokens
 *
 */
contract Basic23TokenVault is Utils, Ownable {
    using SafeMath for uint256;

    /** How many investors we have now */
    uint256 public investorCount;

    /** Sum from the spreadsheet how much tokens we should get on the contract. If the sum does not match at the time of the lock the vault is faulty and must be recreated.*/
    uint256 public tokensToBeAllocated;

    /** How many tokens investors have claimed so far */
    uint256 public totalClaimed;

    /** How many tokens our internal book keeping tells us to have at the time of lock() when all investor data has been loaded */
    uint256 public tokensAllocatedTotal;

    /** How much we have allocated to the investors invested */
    mapping(address => uint256) public balances;

    /** How many tokens investors have claimed */
    mapping(address => uint256) public claimed;

    /** When our claim freeze is over (UNIX timestamp) */
    uint256 public freezeEndsAt;

    /** When this vault was locked (UNIX timestamp) */
    uint256 public lockedAt;

    /** We can also define our own token, which will override the ICO one ***/
    Basic23Token public token;

    /** What is our current state.
    *
    * Loading: Investor data is being loaded and contract not yet locked
    * Holding: Holding tokens for investors
    * Distributing: Freeze time is over, investors can claim their tokens
    */
    enum State{Unknown, Loading, Holding, Distributing}

    /** We allocated tokens for investor */
    event Allocated(address investor, uint value);

    /** We distributed tokens to an investor */
    event Distributed(address investors, uint count);

    event Locked();

    /**
    * Create presale contract where lock up period is given days
    *
    * @param _owner Who can load investor data and lock
    * @param _freezeEndsAt UNIX timestamp when the vault unlocks
    * @param _token Token contract address we are distributing
    * @param _tokensToBeAllocated Total number of tokens this vault will hold - including decimal multiplcation
    *
    */
    function Basic23TokenVault(address _owner, uint256 _freezeEndsAt, Basic23Token _token, uint256 _tokensToBeAllocated) 
        validAddress(_owner)
        greaterThanZero(_freezeEndsAt)
        greaterThanZero(_tokensToBeAllocated)
    {
        owner = _owner;
        token = _token;
        freezeEndsAt = _freezeEndsAt;
        tokensToBeAllocated = _tokensToBeAllocated;
    }

    /// @dev Add a presale participating allocation
    function setInvestor(address _investor, uint256 _amount) 
        public 
        onlyOwner
        validAddress(_investor) 
        greaterThanZero(_amount)
    {
        require(getState() == State.Loading);

        require(lockedAt == 0 &&
                balances[_investor] == 0 &&
                tokensAllocatedTotal.add(_amount) > tokensAllocatedTotal
        );

        balances[_investor] = _amount;
        investorCount++;
        tokensAllocatedTotal = tokensAllocatedTotal.add(_amount);
        Allocated(_investor, _amount);
    }

    /// @dev Lock the vault
    ///      - All balances have been loaded in correctly
    ///      - Tokens are transferred on this vault correctly
    ///      - Checks are in place to prevent creating a vault that is locked with incorrect token balances.
    function lock() onlyOwner {

        require(getState() == State.Loading);

        require(lockedAt == 0 &&                                             //already locked?
                tokensAllocatedTotal == tokensToBeAllocated &&               // Spreadsheet sum does not match to what we have loaded to the investor data
                token.balanceOf(address(this)) == tokensAllocatedTotal       // Do not lock the vault if the given tokens are not on this contract
        ); 
        
        lockedAt = now;
        Locked();
    }

    /// @dev In the case locking failed, then allow the owner to reclaim the tokens on the contract.
    function recoverFailedLock() onlyOwner {
        require(lockedAt == 0); 

        // Transfer all tokens on this contract back to the owner
        token.transfer(owner, token.balanceOf(address(this)));
    }

    /// @dev Get the current balance of tokens in the vault
    /// @return uint How many tokens there are currently in vault
    function getBalance() public constant returns (uint256 howManyTokensCurrentlyInVault) {
        return token.balanceOf(address(this));
    }

    /// @dev Claim N bought tokens to the investor as the msg sender
    function claim() {

        require(getState() == State.Distributing);

        address investor = msg.sender;

        uint256 amount = balances[investor];

        require(lockedAt != 0           &&                    // We were never locked
                now >=  freezeEndsAt    &&                    // Trying to claim early
                balances[investor] > 0  &&                    // Investor is in our list
                claimed[investor] == 0  &&                    // Investor hasn't claimed
                totalClaimed.add(amount) > totalClaimed
        ); 

        claimed[investor] = amount;
        totalClaimed = totalClaimed.add(amount);
        token.transfer(investor, amount);
        Distributed(investor, amount);
    }

    /// @dev Resolve the contract umambigious state
    function getState() public constant returns(State) {
        if(lockedAt == 0) {
            return State.Loading;
        } else if(now > freezeEndsAt) {
            return State.Distributing;
        } else {
            return State.Holding;
        }
    }
}