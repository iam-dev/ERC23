'use strict';

require('chai')
  .use(require('chai-as-promised'))
  .should()


import latestTime from '../installed_contracts/zeppelin-solidity/test/helpers/latestTime'
import {increaseTimeTo, duration} from '../installed_contracts/zeppelin-solidity/test/helpers/increaseTime'

const assertJump = require('../installed_contracts/zeppelin-solidity/test/helpers/assertJump');
const utils = require("./helper/utils.js");
var Basic23TokenMock = artifacts.require("./helpers/Basic23TokenMock.sol");



const Basic23TokenVault = artifacts.require('./contracts/Basic23TokenVault.sol')

contract('Basic23TokenVault', function (accounts) {

    let MAIN_ACCOUNT = accounts[0];
    let BENEFICIARY = accounts[1];
    let INVESTOR_ONE = accounts[2];
    let INVESTOR_TWO = accounts[3];

    const INITAL_SUPPLY = 100 * Math.pow(10,18);

    let token;
    let tokenAddress;
    let releaseTime;
    let tokenVault;
    let tokenVaultAddress;


    beforeEach(async function () {
        token = await Basic23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);
        tokenAddress = token.address;
        console.log("tokenAddress = " +tokenAddress);

        let mainAccountBalance = await token.balanceOf(MAIN_ACCOUNT);
        console.log("mainAccountBalance = " +mainAccountBalance +" should equal to INITAL_SUPPLY = " +INITAL_SUPPLY);
        assert.equal(mainAccountBalance, INITAL_SUPPLY);

        releaseTime = latestTime() + duration.years(1);

        tokenVault = await Basic23TokenVault.new(MAIN_ACCOUNT, releaseTime, tokenAddress, INITAL_SUPPLY);
        tokenVaultAddress = tokenVault.address;
        console.log("tokenVaultAddress = " +tokenVaultAddress);

        var tokenVaultBalance = await tokenVault.getBalance();
        console.log("tokenVaultBalance = " +tokenVaultBalance);

    });

    it('Basic23TokenVault #1 should return the correct information after construction', async function () {
        console.log("Basic23TokenVault #1. BEGIN==========================================================");
      
        var investorCount = await tokenVault.investorCount();
        console.log("investorCount = " +investorCount +" should equal to 0");
        assert.equal(investorCount, 0);

        var tokensToBeAllocated = await tokenVault.tokensToBeAllocated();
        console.log("tokensToBeAllocated = " +tokensToBeAllocated +" should equal to INITAL_SUPPLY = " +INITAL_SUPPLY);
        assert.equal(tokensToBeAllocated, INITAL_SUPPLY);

        var totalClaimed = await tokenVault.totalClaimed();
        console.log("totalClaimed = " +totalClaimed +" should equal to 0");
        assert.equal(totalClaimed, 0);

        var tokensAllocatedTotal = await tokenVault.tokensAllocatedTotal();
        console.log("tokensAllocatedTotal = " +tokensAllocatedTotal +" should equal to 0");
        assert.equal(tokensAllocatedTotal, 0);

        var freezeEndsAt = await tokenVault.freezeEndsAt();
        console.log("freezeEndsAt = " +freezeEndsAt +" should equal to releaseTime = " +releaseTime);
        assert.equal(freezeEndsAt, releaseTime);

        var lockedAt = await tokenVault.lockedAt();
        console.log("lockedAt = " +lockedAt +" should equal to 0");
        assert.equal(lockedAt, 0);
    });

    it('Basic23TokenVault #2 should return the correct information after setInvestor', async function () {
        console.log("Basic23TokenVault #2. BEGIN==========================================================");
     
        var investAmount = 100;
        await tokenVault.setLoadingState();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 1");
        assert.equal(state, 1);

        await tokenVault.setInvestor(INVESTOR_ONE, investAmount);

        var investorCount = await tokenVault.investorCount();
        console.log("investorCount = " +investorCount +" should equal to 1");
        assert.equal(investorCount, 1);

        var tokensAllocatedTotal = await tokenVault.tokensAllocatedTotal();
        console.log("tokensAllocatedTotal = " +tokensAllocatedTotal +" should equal to investAmount = " +investAmount);
        assert.equal(tokensAllocatedTotal, investAmount);

        await tokenVault.setInvestor(INVESTOR_TWO, investAmount);

        investorCount = await tokenVault.investorCount();
        console.log("investorCount = " +investorCount +" should equal to 2");
        assert.equal(investorCount, 2);

        tokensAllocatedTotal = await tokenVault.tokensAllocatedTotal();
        var newInvestAmount = investAmount*2;
        console.log("tokensAllocatedTotal = " +tokensAllocatedTotal +" should equal to newInvestAmount = " +newInvestAmount);
        assert.equal(tokensAllocatedTotal, newInvestAmount);
        
    }); 

    it('Basic23TokenVault #3 should fire Allocated event after calling setInvestor function', async function () {
        console.log("Basic23TokenVault #3. BEGIN==========================================================");
        
        var investAmount = 100;
        await tokenVault.setLoadingState();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 1");
        assert.equal(state, 1);

        await tokenVault.setInvestor(INVESTOR_ONE, investAmount);
      
        
    }); 

    it('Basic23TokenVault #4 an investor should be able to invest more than twice', async function () {
        console.log("Basic23TokenVault #4. BEGIN==========================================================");
     
        var investAmount = 100;
        await tokenVault.setLoadingState();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 1");
        assert.equal(state, 1);

        await tokenVault.setInvestor(INVESTOR_ONE, investAmount);
        await tokenVault.setInvestor(INVESTOR_ONE, investAmount);

        var newInvestAmount = investAmount*2;

        var investorCount = await tokenVault.investorCount();
        console.log("investorCount = " +investorCount +" should equal to 1");
        assert.equal(investorCount, 1);

        var tokensAllocatedTotal = await tokenVault.tokensAllocatedTotal();
        console.log("tokensAllocatedTotal = " +tokensAllocatedTotal +" should equal to newInvestAmount = " +newInvestAmount);
        assert.equal(tokensAllocatedTotal, newInvestAmount);
        
    }); 

    it('Basic23TokenVault #5 should throw an error when call setInvestor while state is not equal to Loading', async function () {
        console.log("Basic23TokenVault #5. BEGIN==========================================================");
     
        var investAmount = 100;
        await tokenVault.setLoadingHolding();
        var state = await tokenVault.state();
        console.log("state = " +state +" should be equal to 2");
        assert.equal(state, 2);

        try {
            console.log("Try to invest while state is not equal to Loading");
            await tokenVault.setInvestor(INVESTOR_ONE, investAmount);
        } catch(error) {    
            return assertJump(error);
        }
        assert.fail('should have thrown before');
        
    }); 
})
