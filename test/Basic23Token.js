'use strict';

import expectThrow from '../installed_contracts/zeppelin-solidity/test//helpers/expectThrow';

const assertJump = require('../installed_contracts/zeppelin-solidity/test/helpers/assertJump');

var Basic23TokenMock = artifacts.require("./helpers/Basic23TokenMock.sol");

contract('Basic23Token', function(accounts) {
    let MAIN_ACCOUNT = accounts[0];
    let RECEIVING_ACCOUNT = accounts[1];

    const INITAL_SUPPLY = 100;
    const TRANSFER_AMOUNT = 100;

    let token;

    beforeEach(async () => {
        token = await Basic23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);
    });

    it("Basic23Token #1 should return the correct totalSupply after construction", async function() {
      console.log("Basic23Token #1. BEGIN==========================================================");
      
      let totalSupply = await token.totalSupply();
      console.log("The totalSupply of the created Token should equal to INITAL_SUPPLY = " +INITAL_SUPPLY);
      assert.equal(totalSupply, INITAL_SUPPLY);

      let mainAccountBalance = await token.balanceOf(MAIN_ACCOUNT);
      console.log("The balance of the MAIN_ACCOUNT  should be equal to INITAL_SUPPLY = " +INITAL_SUPPLY);
      assert.equal(mainAccountBalance, INITAL_SUPPLY);
    });

    it("Basic23Token #2 should return correct balances after transfer", async function(){
      console.log("Basic23Token #2. BEGIN==========================================================");

      let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceBeforeTransfer = " +mainAccountBalanceBeforeTransfer +" should equal to INITAL_SUPPLY = " +INITAL_SUPPLY);
      assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

      let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceBeforeTransfer = " +ReceivingAccountBalanceBeforeTransfer +" should equal to 0");
      assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

      try {
        console.log("Try to transfer " +TRANSFER_AMOUNT +" from MAIN_ACCOUNT to RECEIVING_ACCOUNT");
        await token.transfer(RECEIVING_ACCOUNT, TRANSFER_AMOUNT);
      } catch(error) {
        return assertJump(error);
      }

      let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
      var restBalance = INITAL_SUPPLY-TRANSFER_AMOUNT;
      console.log("mainAccountBalanceAfterTransfer = " +mainAccountBalanceAfterTransfer +"  should equal to INITAL_SUPPLY-TRANSFER_AMOUNT = " +restBalance);
      assert.equal(mainAccountBalanceAfterTransfer, restBalance);

      let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceAfterTransfer  should equal to " +ReceivingAccountBalanceAfterTransfer);
      assert.equal(ReceivingAccountBalanceAfterTransfer, TRANSFER_AMOUNT);
    });

    it("Basic23Token #3 should throw an error when trying to transfer less than 0", async function() {
      console.log("Basic23Token #3 BEGIN==========================================================");

      var NEG_TRANSFER_AMOUNT =  -2;
      console.log("MAIN_ACCOUNT tries to transfer " +NEG_TRANSFER_AMOUNT +" token to RECEIVING_ACCOUNT while TRANSFER_AMOUNT is smaller dan 0");

      let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceBeforeTransfer = " +mainAccountBalanceBeforeTransfer +"  should equal to INITAL_SUPPLY =" +INITAL_SUPPLY);
      assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

      let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceBeforeTransfer = " +ReceivingAccountBalanceBeforeTransfer +"  should equal to 0");
      assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

      console.log("Try to transfer " +NEG_TRANSFER_AMOUNT +" from MAIN_ACCOUNT to RECEIVING_ACCOUNT");
      await expectThrow(token.transfer(RECEIVING_ACCOUNT, NEG_TRANSFER_AMOUNT));
      
      let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceAfterTransfer = " +mainAccountBalanceAfterTransfer +"  should equal to INITAL_SUPPLY = " +INITAL_SUPPLY);
      assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY);

      let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceAfterTransfer = " +ReceivingAccountBalanceAfterTransfer +"  should equal to 0");
      assert.equal(ReceivingAccountBalanceAfterTransfer, 0);

    });

    it("Basic23Token #4 should throw an error when trying to transfer more than balance", async function() {
      console.log("Basic23Token #4 BEGIN==========================================================");

      var HIGH_TRANSFER_AMOUNT = INITAL_SUPPLY +1;
      console.log("MAIN_ACCOUNT tries to transfer " +HIGH_TRANSFER_AMOUNT +" token to RECEIVING_ACCOUNT while TRANSFER_AMOUNT is greater than than balance of MAIN_ACCOUNT");

      let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceBeforeTransfer = " +mainAccountBalanceBeforeTransfer +"  should equal to INITAL_SUPPLY = " +INITAL_SUPPLY);
      assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

      let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceBeforeTransfer = " +ReceivingAccountBalanceBeforeTransfer +"  should equal to 0");
      assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

      await expectThrow(token.transfer(RECEIVING_ACCOUNT, HIGH_TRANSFER_AMOUNT));
      
      let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceAfterTransfer = " +mainAccountBalanceAfterTransfer +"  should equal to INITAL_SUPPLY = " +INITAL_SUPPLY);
      assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY);

      let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceAfterTransfer = " +ReceivingAccountBalanceAfterTransfer +"  should equal to 0");
      assert.equal(ReceivingAccountBalanceAfterTransfer, 0);

    });

    
    it("Basic23Token #5 should throw an error when trying to transfer without any tokens", async function() {
      console.log("Basic23Token #5 BEGIN==========================================================");
      console.log("MAIN_ACCOUNT tries to transfer " +TRANSFER_AMOUNT +" token to RECEIVING_ACCOUNT while MAIN_ACCOUNT does not have any tokens");

      let token = await Basic23TokenMock.new(MAIN_ACCOUNT, 0);

      let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceBeforeTransfer = " +mainAccountBalanceBeforeTransfer +"  should equal to 0");
      assert.equal(mainAccountBalanceBeforeTransfer, 0);
      
      let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceBeforeTransfer = " +ReceivingAccountBalanceBeforeTransfer +"  should equal to 0");
      assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

      
      console.log("Try to transfer " +TRANSFER_AMOUNT +" from MAIN_ACCOUNT to RECEIVING_ACCOUNT");
      await expectThrow(token.transfer(RECEIVING_ACCOUNT, TRANSFER_AMOUNT));
      let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceAfterTransfer = " +mainAccountBalanceAfterTransfer +"  should equal to 0");
      assert.equal(mainAccountBalanceAfterTransfer, 0);

      let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceAfterTransfer = " +ReceivingAccountBalanceAfterTransfer +" should equal to 0");
      assert.equal(ReceivingAccountBalanceAfterTransfer, 0);
        
  
    });

     it('"Basic23Token #6 should throw an error when trying to transfer to 0x0', async function() {
      console.log("Basic23Token #6 BEGIN==========================================================");

      let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceBeforeTransfer = " +mainAccountBalanceBeforeTransfer +"  should equal to INITAL_SUPPLY = " +INITAL_SUPPLY);
      assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);
     
      console.log("Try to transfer " +TRANSFER_AMOUNT +" from MAIN_ACCOUNT to 0x0");
      await expectThrow(token.transfer(0x0, TRANSFER_AMOUNT));
      
      let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceAfterTransfer = " +mainAccountBalanceAfterTransfer +"  should equal to INITAL_SUPPLY" +INITAL_SUPPLY);
      assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY);
    });
});
