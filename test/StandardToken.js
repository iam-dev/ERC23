'use strict';

const assertJump = require('./helpers/assertJump');
var StandardTokenMock = artifacts.require('./helpers/StandardTokenMock.sol');

contract('StandardToken', function(accounts) {
  let MAIN_ACCOUNT = accounts[0];
  let RECEIVING_ACCOUNT = accounts[1];
  let SPENDER_ACCOUNT = accounts[2]

  const INITAL_SUPPLY = 100;
  const TRANSFER_AMOUNT = 100;
  const APPROVE_AMOUNT = 40;

  it('StandardToken #1 should return the correct totalSupply after construction', async function() {
    console.log("StandardToken #1 BEGIN==========================================================");
    console.log("What is the totalSupply of the created Token?");

    let token = await StandardTokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let totalSupply = await token.totalSupply();
    console.log("The totalSupply of the created Token = " +INITAL_SUPPLY);
    assert.equal(totalSupply, INITAL_SUPPLY);

    let mainAccountBalance = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalance =" +mainAccountBalance);
    assert.equal(mainAccountBalance, INITAL_SUPPLY);
  });

  it('StandardToken #2 should return the correct allowance amount after approval', async function() {
    console.log("StandardToken #2 BEGIN==========================================================");
    console.log("RECEIVING_ACCOUNT allowed to transfer " +APPROVE_AMOUNT +" because RECEIVING_ACCOUNT has " +APPROVE_AMOUNT +" approved amount");

    let token = await StandardTokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceBeforeTransfer=" +ReceivingAccountBalanceBeforeTransfer);
    assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

    await token.approve(RECEIVING_ACCOUNT, APPROVE_AMOUNT);
    console.log("APPROVE_AMOUNT " +APPROVE_AMOUNT);

    let allowance = await token.allowance(MAIN_ACCOUNT, RECEIVING_ACCOUNT);
    console.log("Allowance " +allowance +" from mainAccount to ReceivingAccount");
    assert.equal(allowance, APPROVE_AMOUNT);

    let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceAfterTransfer=" +mainAccountBalanceAfterTransfer);
    assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceAfterTransfer=" +ReceivingAccountBalanceAfterTransfer);
    assert.equal(ReceivingAccountBalanceAfterTransfer, 0);
  });

  it("StandardToken #3 should return correct balances after transfer", async function(){
    console.log("StandardToken #3 BEGIN==========================================================");
    console.log("MAIN_ACCOUNT should be able to transfer " +TRANSFER_AMOUNT +" token to RECEIVING_ACCOUNT while MAIN_ACCOUNT has " +INITAL_SUPPLY +" token");

    let token = await StandardTokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceBeforeTransfer=" +ReceivingAccountBalanceBeforeTransfer);
    assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

    try {
      console.log("Try to transfer " +TRANSFER_AMOUNT +" from mainAccount to ReceivingAccount");
      await token.transfer(RECEIVING_ACCOUNT, TRANSFER_AMOUNT);
    } catch(error) {
      return assertJump(error);
    }

    let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceAfterTransfer=" +mainAccountBalanceAfterTransfer);
    assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY-TRANSFER_AMOUNT);

    let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceAfterTransfer=" +ReceivingAccountBalanceAfterTransfer);
    assert.equal(ReceivingAccountBalanceAfterTransfer, TRANSFER_AMOUNT);
  });

  it("StandardToken #4 should throw an error when trying to transfer less than 0", async function() {
    console.log("StandardToken #4 BEGIN==========================================================");
    
    var NEG_TRANSFER_AMOUNT =  -2;
    console.log("MAIN_ACCOUNT tries to transfer " +NEG_TRANSFER_AMOUNT +" token to RECEIVING_ACCOUNT while TRANSFER_AMOUNT is smaller dan 0");

    let token = await StandardTokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceBeforeTransfer=" +ReceivingAccountBalanceBeforeTransfer);
    assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

    try {
      console.log("Try to transfer " +NEG_TRANSFER_AMOUNT +" from mainAccount to ReceivingAccount");
      await token.transfer(RECEIVING_ACCOUNT, NEG_TRANSFER_AMOUNT);
    } catch(error) {
      let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceAfterTransfer =" +mainAccountBalanceAfterTransfer);
      assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY);

      let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceAfterTransfer =" +ReceivingAccountBalanceAfterTransfer);
      assert.equal(ReceivingAccountBalanceAfterTransfer, 0);

      return assertJump(error);
    }
    assert.fail('should have thrown before');
  });

  it("StandardToken #5 should throw an error when trying to transfer more than balance", async function() {
    console.log("StandardToken #5 BEGIN==========================================================");

    var HIGH_TRANSFER_AMOUNT = INITAL_SUPPLY +1;
    console.log("MAIN_ACCOUNT tries to transfer " +HIGH_TRANSFER_AMOUNT +" token to RECEIVING_ACCOUNT while TRANSFER_AMOUNT is greater than than balance of MAIN_ACCOUNT");

    let token = await StandardTokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceBeforeTransfer=" +ReceivingAccountBalanceBeforeTransfer);
    assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

    try {
      console.log("Try to transfer " +HIGH_TRANSFER_AMOUNT +" from mainAccount to ReceivingAccount");
      await token.transfer(RECEIVING_ACCOUNT, HIGH_TRANSFER_AMOUNT);
    } catch(error) {
      let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceAfterTransfer =" +mainAccountBalanceAfterTransfer);
      assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY);

      let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceAfterTransfer =" +ReceivingAccountBalanceAfterTransfer);
      assert.equal(ReceivingAccountBalanceAfterTransfer, 0);

      return assertJump(error);
    }
    assert.fail('should have thrown before');
  });

  it('StandardToken #6 should return correct balances after transfering from another account', async function() {
    console.log("StandardToken #6 BEGIN==========================================================");

    let token = await StandardTokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceBeforeTransfer=" +ReceivingAccountBalanceBeforeTransfer);
    assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

    let spenderAccountBalanceBeforeTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceBeforeTransfer=" +spenderAccountBalanceBeforeTransfer);

    await token.approve(SPENDER_ACCOUNT, APPROVE_AMOUNT);
    console.log("APPROVE_AMOUNT " +APPROVE_AMOUNT);
    await token.transferFrom(MAIN_ACCOUNT, RECEIVING_ACCOUNT, TRANSFER_AMOUNT, {from: SPENDER_ACCOUNT});
    console.log("TransferFrom " +TRANSFER_AMOUNT +" MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT")

    let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceAfterTransfer=" +mainAccountBalanceAfterTransfer);
    assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY-TRANSFER_AMOUNT);

    let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceAfterTransfer=" +ReceivingAccountBalanceAfterTransfer);
    assert.equal(ReceivingAccountBalanceAfterTransfer, TRANSFER_AMOUNT);

    let spenderAccountBalanceAfterTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceAfterTransfer=" +spenderAccountBalanceAfterTransfer);
    assert.equal(spenderAccountBalanceAfterTransfer, INITAL_SUPPLY-TRANSFER_AMOUNT);
  });

  it('StandardToken #7 should throw an error when trying to transfer more than allowed', async function() {
    console.log("StandardToken #7 BEGIN==========================================================");

    const INITAL_SUPPLY = 99;
    const TRANSFER_AMOUNT = 100;
    const APPROVE_AMOUNT = 99;
    const MAIN_ACCOUNT = accounts[0];
    const RECEIVING_ACCOUNT = accounts[1];
    const SPENDER_ACCOUNT = accounts[2];

    let token = await StandardTokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceBeforeTransfer=" +ReceivingAccountBalanceBeforeTransfer);
    assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

    let spenderAccountBalanceBeforeTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceBeforeTransfer=" +spenderAccountBalanceBeforeTransfer);

    await token.approve(RECEIVING_ACCOUNT, APPROVE_AMOUNT);
    console.log("APPROVE_AMOUNT " +APPROVE_AMOUNT);
    try {
      console.log("Try to TransferFrom " +TRANSFER_AMOUNT +" mainAccount to thirdAccount from ReceivingAccount");
      await token.transferFrom(MAIN_ACCOUNT, SPENDER_ACCOUNT, TRANSFER_AMOUNT, {from: RECEIVING_ACCOUNT});
    } catch(error) {
      let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceAfterTransfer =" +mainAccountBalanceAfterTransfer);
      assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY);

      let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceAfterTransfer =" +ReceivingAccountBalanceAfterTransfer);
      assert.equal(ReceivingAccountBalanceAfterTransfer, 0);

      let spenderAccountBalanceAfterTransfer = await token.balanceOf(SPENDER_ACCOUNT);
      console.log("spenderAccountBalanceAfterTransfer =" +spenderAccountBalanceAfterTransfer);
      assert.equal(spenderAccountBalanceAfterTransfer, 0);

      return assertJump(error);
    }
    assert.fail('should have thrown before');
  });

  it('StandardToken #8 should throw an error when trying to transfer when not allowed', async function() {
    console.log("StandardToken #8 BEGIN==========================================================");

    const INITAL_SUPPLY = 100;
    const TRANSFER_AMOUNT = 100;
    const MAIN_ACCOUNT = accounts[0];
    const RECEIVING_ACCOUNT = accounts[1];
    const SPENDER_ACCOUNT = accounts[2];

    let token = await StandardTokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceBeforeTransfer=" +ReceivingAccountBalanceBeforeTransfer);
    assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

    let spenderAccountBalanceBeforeTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceBeforeTransfer=" +spenderAccountBalanceBeforeTransfer);

    try {
      console.log("Try to TransferFrom " +TRANSFER_AMOUNT +" mainAccount to thirdAccount from ReceivingAccount");
      await token.transferFrom(MAIN_ACCOUNT, SPENDER_ACCOUNT, TRANSFER_AMOUNT, {from: RECEIVING_ACCOUNT});
    } catch(error) {
      let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceAfterTransfer =" +mainAccountBalanceAfterTransfer);
      assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY);

      let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceAfterTransfer =" +ReceivingAccountBalanceAfterTransfer);
      assert.equal(ReceivingAccountBalanceAfterTransfer, 0);

      let spenderAccountBalanceAfterTransfer = await token.balanceOf(SPENDER_ACCOUNT);
      console.log("spenderAccountBalanceAfterTransfer =" +spenderAccountBalanceAfterTransfer);
      assert.equal(spenderAccountBalanceAfterTransfer, 0);

      return assertJump(error);
    }
    assert.fail('should have thrown before');
  });

  it('StandardToken #9 should throw an error when trying to transfer less than 0', async function() {
    console.log("StandardToken #9 BEGIN==========================================================");

    const INITAL_SUPPLY = 100;
    const TRANSFER_AMOUNT = -1;
    const APPROVE_AMOUNT = 100;
    const MAIN_ACCOUNT = accounts[0];
    const RECEIVING_ACCOUNT = accounts[1];
    const SPENDER_ACCOUNT = accounts[2];

    let token = await StandardTokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceBeforeTransfer=" +ReceivingAccountBalanceBeforeTransfer);
    assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

    let spenderAccountBalanceBeforeTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceBeforeTransfer=" +spenderAccountBalanceBeforeTransfer);

    await token.approve(RECEIVING_ACCOUNT, APPROVE_AMOUNT);
    console.log("APPROVE_AMOUNT " +APPROVE_AMOUNT);
    try {
      console.log("Try to TransferFrom " +TRANSFER_AMOUNT +" mainAccount to thirdAccount from ReceivingAccount");
      await token.transferFrom(MAIN_ACCOUNT, SPENDER_ACCOUNT, TRANSFER_AMOUNT, {from: RECEIVING_ACCOUNT});
    } catch(error) {
      let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceAfterTransfer =" +mainAccountBalanceAfterTransfer);
      assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY);

      let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceAfterTransfer =" +ReceivingAccountBalanceAfterTransfer);
      assert.equal(ReceivingAccountBalanceAfterTransfer, 0);

      let spenderAccountBalanceAfterTransfer = await token.balanceOf(SPENDER_ACCOUNT);
      console.log("spenderAccountBalanceAfterTransfer =" +spenderAccountBalanceAfterTransfer);
      assert.equal(spenderAccountBalanceAfterTransfer, 0);

      return assertJump(error);
    }
    assert.fail('should have thrown before');
  });

  it('StandardToken #10 should throw an error when trying to transfer more than supply', async function() {
    console.log("StandardToken #10 BEGIN==========================================================");

    const INITAL_SUPPLY = 100;
    const TRANSFER_AMOUNT = 101;
    const APPROVE_AMOUNT = 101;
    const MAIN_ACCOUNT = accounts[0];
    const RECEIVING_ACCOUNT = accounts[1];
    const SPENDER_ACCOUNT = accounts[2];

    let token = await StandardTokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceBeforeTransfer=" +ReceivingAccountBalanceBeforeTransfer);
    assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

    let spenderAccountBalanceBeforeTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceBeforeTransfer=" +spenderAccountBalanceBeforeTransfer);

    await token.approve(RECEIVING_ACCOUNT, APPROVE_AMOUNT);
    console.log("APPROVE_AMOUNT " +APPROVE_AMOUNT);
    try {
      console.log("Try to TransferFrom " +TRANSFER_AMOUNT +" mainAccount to thirdAccount from ReceivingAccount");
      await token.transferFrom(MAIN_ACCOUNT, SPENDER_ACCOUNT, TRANSFER_AMOUNT, {from: RECEIVING_ACCOUNT});
    } catch(error) {
      let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceAfterTransfer =" +mainAccountBalanceAfterTransfer);
      assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY);

      let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
      console.log("ReceivingAccountBalanceAfterTransfer =" +ReceivingAccountBalanceAfterTransfer);
      assert.equal(ReceivingAccountBalanceAfterTransfer, 0);

      let spenderAccountBalanceAfterTransfer = await token.balanceOf(SPENDER_ACCOUNT);
      console.log("spenderAccountBalanceAfterTransfer =" +spenderAccountBalanceAfterTransfer);
      assert.equal(spenderAccountBalanceAfterTransfer, 0);

      return assertJump(error);
    }
    assert.fail('should have thrown before');
  });

});
