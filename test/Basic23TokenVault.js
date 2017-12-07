'use strict';

require('chai')
  .use(require('chai-as-promised'))
  .should()


import latestTime from '../installed_contracts/zeppelin-solidity/test/helpers/latestTime'
import {increaseTimeTo, duration} from '../installed_contracts/zeppelin-solidity/test/helpers/increaseTime'

const assertJump = require('../installed_contracts/zeppelin-solidity/test/helpers/assertJump');
const utils = require("./helpers/utils.js");
var UpgradeableStandard23TokenMock = artifacts.require("./helpers/UpgradeableStandard23TokenMock.sol");



const Basic23TokenVault = artifacts.require('./contracts/Basic23TokenVault.sol')

contract('Basic23TokenVault', function ([_, owner, investor]) {

    const INITAL_SUPPLY = 100 * Math.pow(10,18);
    const INVEST_AMOUNT = 100;

    let tokenAddress;
    let tokenVaultAddress;


    let tokenName = "Upgradeable Token";
    let tokenSymbol = "UT";
    let tokenDecimals = 18;
/*
    let MAIN_ACCOUNT = accounts[0];
    let BENEFICIARY = accounts[1];
    let INVESTOR_ONE = accounts[2];
    let INVESTOR_TWO = accounts[3];
    let INVESTOR_THREE = accounts[4];

    
    const INVEST_AMOUNT = 100;

    let token;
    
    let releaseTime;
    let tokenVault;
   
*/

    beforeEach(async function () {
        this.token = await UpgradeableStandard23TokenMock.new(owner, INITAL_SUPPLY, tokenName, tokenSymbol, tokenDecimals);
        tokenAddress = this.token.address;
        console.log("tokenAddress = " +tokenAddress);

        this.releaseTime = latestTime() + duration.years(1)

    
        this.tokenVault = await Basic23TokenVault.new(owner, this.releaseTime, tokenAddress, INITAL_SUPPLY);
        tokenVaultAddress = this.tokenVault.address;
        console.log("tokenVaultAddress = " +tokenVaultAddress);


        var test = await this.token.transferOwnership(tokenVaultAddress);


        var tokenVaultBalance = await this.tokenVault.getBalance();
        console.log("tokenVaultBalance = " +tokenVaultBalance);
       

    });
     /*

    it('Basic23TokenVault #1 should return the correct information after construction', async function () {
        console.log("Basic23TokenVault #1. BEGIN==========================================================");
      
        var investorCount = await this.tokenVault.investorCount();
        console.log("investorCount = " +investorCount +" should equal to 0");
        assert.equal(investorCount, 0);

        var tokensToBeAllocated = await this.tokenVault.tokensToBeAllocated();
        console.log("tokensToBeAllocated = " +tokensToBeAllocated +" should equal to INITAL_SUPPLY = " +INITAL_SUPPLY);
        assert.equal(tokensToBeAllocated, INITAL_SUPPLY);

        var totalClaimed = await this.tokenVault.totalClaimed();
        console.log("totalClaimed = " +totalClaimed +" should equal to 0");
        assert.equal(totalClaimed, 0);

        var tokensAllocatedTotal = await this.tokenVault.tokensAllocatedTotal();
        console.log("tokensAllocatedTotal = " +tokensAllocatedTotal +" should equal to 0");
        assert.equal(tokensAllocatedTotal, 0);

        var freezeEndsAt = await this.tokenVault.freezeEndsAt();
        console.log("freezeEndsAt = " +freezeEndsAt +" should equal to releaseTime = " +releaseTime);
        assert.equal(freezeEndsAt, releaseTime);

        var lockedAt = await this.tokenVault.lockedAt();
        console.log("lockedAt = " +lockedAt +" should equal to 0");
        assert.equal(lockedAt, 0);
    });

   

    it('Basic23TokenVault #2 should return the correct information after setInvestor', async function () {
        console.log("Basic23TokenVault #2. BEGIN==========================================================");
     
        await tokenVault.setStateLoading();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 1");
        assert.equal(state, 1);

        await tokenVault.setInvestor(INVESTOR_ONE, INVEST_AMOUNT);

        var investorCount = await tokenVault.investorCount();
        console.log("investorCount = " +investorCount +" should equal to 1");
        assert.equal(investorCount, 1);

        var tokensAllocatedTotal = await tokenVault.tokensAllocatedTotal();
        console.log("tokensAllocatedTotal = " +tokensAllocatedTotal +" should equal to INVEST_AMOUNT = " +INVEST_AMOUNT);
        assert.equal(tokensAllocatedTotal, INVEST_AMOUNT);

        await tokenVault.setInvestor(INVESTOR_TWO, INVEST_AMOUNT);

        investorCount = await tokenVault.investorCount();
        console.log("investorCount = " +investorCount +" should equal to 2");
        assert.equal(investorCount, 2);

        tokensAllocatedTotal = await tokenVault.tokensAllocatedTotal();
        var newInvestAmount = INVEST_AMOUNT*2;
        console.log("tokensAllocatedTotal = " +tokensAllocatedTotal +" should equal to newInvestAmount = " +newInvestAmount);
        assert.equal(tokensAllocatedTotal, newInvestAmount);
        
    }); 

    it('Basic23TokenVault #3 should fire Allocated event after calling setInvestor function', async function () {
        console.log("Basic23TokenVault #3. BEGIN==========================================================");
        //@dev: https://ethereum.stackexchange.com/questions/15353/how-to-listen-for-contract-events-in-javascript-tests
        await tokenVault.setStateLoading();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 1");
        assert.equal(state, 1);

        await tokenVault.setInvestor(INVESTOR_ONE, INVEST_AMOUNT);

        utils.assertEvent(tokenVault, {event: "Allocated", logIndex: 1, args:{_investor: INVESTOR_ONE, _amount: INVEST_AMOUNT} });
    }); 

    it('Basic23TokenVault #4 an investor should be able to invest more than twice', async function () {
        console.log("Basic23TokenVault #4. BEGIN==========================================================");

        await tokenVault.setStateLoading();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 1");
        assert.equal(state, 1);

        await tokenVault.setInvestor(INVESTOR_ONE, INVEST_AMOUNT);
        await tokenVault.setInvestor(INVESTOR_ONE, INVEST_AMOUNT);

        var newInvestAmount = INVEST_AMOUNT*2;

        var investorCount = await tokenVault.investorCount();
        console.log("investorCount = " +investorCount +" should equal to 1");
        assert.equal(investorCount, 1);

        var tokensAllocatedTotal = await tokenVault.tokensAllocatedTotal();
        console.log("tokensAllocatedTotal = " +tokensAllocatedTotal +" should equal to newInvestAmount = " +newInvestAmount);
        assert.equal(tokensAllocatedTotal, newInvestAmount);
        
    }); 

    it('Basic23TokenVault #5 should throw an error when call setInvestor while state is not equal to Loading', async function () {
        console.log("Basic23TokenVault #5. BEGIN==========================================================");
     
        await tokenVault.setStateHolding();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 2");
        assert.equal(state, 2);


        try {
            console.log("Try to invest while state is not equal to Loading");
            await tokenVault.setInvestor(INVESTOR_ONE, INVEST_AMOUNT);
        } catch(error) {    
            return assertJump(error);
        }
        assert.fail('should have thrown before');
        
    }); 

    it('Basic23TokenVault #6 should throw an error when call setInvestor while the contract is locked', async function () {
        console.log("Basic23TokenVault #6. BEGIN==========================================================");
     
        await tokenVault.setStateLoading();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 1");
        assert.equal(state, 1);

        await tokenVault.lock();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 2");
        assert.equal(state, 2);

        try {
            console.log("Try to invest while it's locked");
            await tokenVault.setInvestor(INVESTOR_THREE, INVEST_AMOUNT);
        } catch(error) {    
            return assertJump(error);
        }
        assert.fail('should have thrown before');  
    }); 

    it('Basic23TokenVault #7 should throw an error when call claim while the contract is locked', async function () {
        console.log("Basic23TokenVault #7. BEGIN==========================================================");
     
        await tokenVault.setStateLoading();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 1");
        assert.equal(state, 1);

        await tokenVault.lock();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 2");
        assert.equal(state, 2);

        try {
            console.log("Try to claim while it's locked");
            await tokenVault.claim();
        } catch(error) {    
            return assertJump(error);
        }
        assert.fail('should have thrown before');  
    }); 

    it('Basic23TokenVault #8 should throw an error when call claim while the state is Loading', async function () {
        console.log("Basic23TokenVault #8. BEGIN==========================================================");
     
        await tokenVault.setStateLoading();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 1");
        assert.equal(state, 1);

        try {
            console.log("Try to claim while the state is Loading");
            await tokenVault.claim();
        } catch(error) {    
            return assertJump(error);
        }
        assert.fail('should have thrown before');  
    }); 


    it('Basic23TokenVault #9 should be able to claim and return the correct information after claim', async function () {
        console.log("Basic23TokenVault #9. BEGIN==========================================================");

        await increaseTimeTo(this.releaseTime + duration.seconds(1));

        
        await this.tokenVault.setStateLoading({from: owner});
        var state = await this.tokenVault.state({from: owner});
        console.log("state = " +state +" should be equal to 1");
        assert.equal(state, 1);

        await this.tokenVault.setInvestor(investor, INVEST_AMOUNT, {from: owner});

        await this.tokenVault.setStateDistributing({from: owner});
        var stateDistributing = await this.tokenVault.state({from: owner});
        console.log("stateDistributing = " +stateDistributing +" should be equal to 3");
        assert.equal(stateDistributing, 3);

        await this.tokenVault.claim({from: investor});

        var balanceInvestor = await this.tokenVault.balances(investor, {from: owner});
        console.log("balanceInvestor = " +balanceInvestor +" should be equal to 0");
         assert.equal(balanceInvestor, 0);

        var totalClaimed = await this.tokenVault.totalClaimed({from: owner});
        console.log("totalClaimed = " +totalClaimed +" should equal to INVEST_AMOUNT = " +INVEST_AMOUNT);
        assert.equal(totalClaimed, INVEST_AMOUNT);

    }); 
*/
})
