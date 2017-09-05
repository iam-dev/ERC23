'use strict';

const assertJump = require('./helpers/assertJump');
var Standard23TokenMock = artifacts.require('./helpers/Standard23TokenMock.sol');

contract('Standard23Token', function(accounts) {
  let MAIN_ACCOUNT = accounts[0];
  let RECEIVING_ACCOUNT = accounts[1];
  let SPENDER_ACCOUNT = accounts[2]

  const INITAL_SUPPLY = 100;
  const TRANSFER_AMOUNT = 100;
  const APPROVE_AMOUNT = 40;


  it('Standard23Token #1 should return the correct totalSupply after construction', async function() {
    console.log("Standard23Token #1 BEGIN==========================================================");
    console.log("What is the totalSupply of the created Token?");

    let token = await Standard23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let totalSupply = await token.totalSupply();
    console.log("The totalSupply of the created Token should equal to " +INITAL_SUPPLY);
    assert.equal(totalSupply, INITAL_SUPPLY);

    console.log("What is the balance of MAIN_ACCOUNT?");
    let mainAccountBalance = await token.balanceOf(MAIN_ACCOUNT);
    console.log("The balance of the MAIN_ACCOUNT  should be " +INITAL_SUPPLY);
    assert.equal(mainAccountBalance, INITAL_SUPPLY);
  });

  it('Standard23Token #2 should return the correct allowance amount after approval', async function() {
    console.log("Standard23Token #2 BEGIN==========================================================");
    console.log("SPENDER_ACCOUNT allowed to transfer " +APPROVE_AMOUNT +" because SPENDER_ACCOUNT has " +APPROVE_AMOUNT +" approved amount");

    let token = await Standard23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let spenderAccountBalanceBeforeTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceBeforeTransfer=" +spenderAccountBalanceBeforeTransfer);
    assert.equal(spenderAccountBalanceBeforeTransfer, 0);

    await token.approve(SPENDER_ACCOUNT, APPROVE_AMOUNT);
    console.log("APPROVE_AMOUNT = " +APPROVE_AMOUNT);


    let allowance = await token.allowance(MAIN_ACCOUNT, SPENDER_ACCOUNT);
    console.log("Allowance = " +allowance +"  of SPENDER_ACCOUNT");
    assert.equal(allowance, APPROVE_AMOUNT);

    let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceAfterTransfer = " +mainAccountBalanceAfterTransfer);
    assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY);

    let spenderAccountBalanceAfterTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceAfterTransfer = " +spenderAccountBalanceAfterTransfer);
    assert.equal(spenderAccountBalanceAfterTransfer, 0);
  });
  

  it('Standard23Token #3 should return correct balances after transfering from another account', async function() {
    console.log("Standard23Token #3 BEGIN==========================================================");
    let token = await Standard23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceBeforeTransfer=" +ReceivingAccountBalanceBeforeTransfer);
    assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

    let spenderAccountBalanceBeforeTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceBeforeTransfer=" +spenderAccountBalanceBeforeTransfer);
    assert.equal(spenderAccountBalanceBeforeTransfer, 0);

    await token.approve(SPENDER_ACCOUNT, APPROVE_AMOUNT);
    console.log("APPROVE_AMOUNT = " +APPROVE_AMOUNT);

    let allowance = await token.allowance(MAIN_ACCOUNT, SPENDER_ACCOUNT);
    console.log("Allowance = " +allowance +"  of SPENDER_ACCOUNT");
    assert.equal(allowance, APPROVE_AMOUNT);

    await token.transferFrom(MAIN_ACCOUNT, RECEIVING_ACCOUNT, APPROVE_AMOUNT, {from: SPENDER_ACCOUNT});

    let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceAfterTransfer =" +mainAccountBalanceAfterTransfer);
    assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY - APPROVE_AMOUNT);

    let ReceivingAccountBalanceAfterTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceAfterTransfer = " +ReceivingAccountBalanceAfterTransfer);
    assert.equal(ReceivingAccountBalanceAfterTransfer, APPROVE_AMOUNT);

    let spenderAccountBalanceAfterTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceAfterTransfer = " +spenderAccountBalanceAfterTransfer);
    assert.equal(spenderAccountBalanceAfterTransfer, 0);
    
  });


  it('Standard23Token #4 should throw an error when trying to transfer more than allowed', async function() {
    console.log("Standard23Token #4 BEGIN==========================================================");

    const INITAL_SUPPLY = 99;
    const TRANSFER_AMOUNT = 100;
    const APPROVE_AMOUNT = 99;
    const MAIN_ACCOUNT = accounts[0];
    const RECEIVING_ACCOUNT = accounts[1];
    const SPENDER_ACCOUNT = accounts[2];

    let token = await Standard23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceBeforeTransfer=" +ReceivingAccountBalanceBeforeTransfer);
    assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

    let spenderAccountBalanceBeforeTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceBeforeTransfer=" +spenderAccountBalanceBeforeTransfer);
    assert.equal(spenderAccountBalanceBeforeTransfer, 0);

    await token.approve(SPENDER_ACCOUNT, APPROVE_AMOUNT);
    console.log("APPROVE_AMOUNT " +APPROVE_AMOUNT);
    try {
      console.log("Try to TransferFrom " +TRANSFER_AMOUNT +" MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT");
      await token.transferFrom(MAIN_ACCOUNT, RECEIVING_ACCOUNT, TRANSFER_AMOUNT, {from: SPENDER_ACCOUNT});
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

  it('Standard23Token #5 should throw an error when trying to transfer when not allowed', async function() {
    console.log("Standard23Token #5 BEGIN==========================================================");

    const INITAL_SUPPLY = 100;
    const TRANSFER_AMOUNT = 100;
    const MAIN_ACCOUNT = accounts[0];
    const RECEIVING_ACCOUNT = accounts[1];
    const SPENDER_ACCOUNT = accounts[2];

    let token = await Standard23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let ReceivingAccountBalanceBeforeTransfer = await token.balanceOf(RECEIVING_ACCOUNT);
    console.log("ReceivingAccountBalanceBeforeTransfer=" +ReceivingAccountBalanceBeforeTransfer);
    assert.equal(ReceivingAccountBalanceBeforeTransfer, 0);

    let spenderAccountBalanceBeforeTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceBeforeTransfer=" +spenderAccountBalanceBeforeTransfer);
    assert.equal(spenderAccountBalanceBeforeTransfer, 0);

    try {
      console.log("Try to TransferFrom " +TRANSFER_AMOUNT +" MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT");
      await token.transferFrom(MAIN_ACCOUNT, RECEIVING_ACCOUNT, TRANSFER_AMOUNT, {from: MAIN_ACCOUNT});
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

  it('Standard23Token #6 should throw an error when trying to transfer less than 0', async function() {
    console.log("Standard23Token #6 BEGIN==========================================================");

    const INITAL_SUPPLY = 100;
    const TRANSFER_AMOUNT = -1;
    const APPROVE_AMOUNT = 100;
    const MAIN_ACCOUNT = accounts[0];
    const RECEIVING_ACCOUNT = accounts[1];
    const SPENDER_ACCOUNT = accounts[2];

    let token = await Standard23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

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
      console.log("Try to TransferFrom " +TRANSFER_AMOUNT +" MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT");
      await token.transferFrom(MAIN_ACCOUNT, RECEIVING_ACCOUNT, TRANSFER_AMOUNT, {from: SPENDER_ACCOUNT});
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


  it('Standard23Token #7 should throw an error when trying to transfer more than supply', async function() {
    console.log("Standard23Token #7 BEGIN==========================================================");

    const INITAL_SUPPLY = 100;
    const TRANSFER_AMOUNT = 101;
    const APPROVE_AMOUNT = 101;
    const MAIN_ACCOUNT = accounts[0];
    const RECEIVING_ACCOUNT = accounts[1];
    const SPENDER_ACCOUNT = accounts[2];

    let token = await Standard23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

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
      console.log("Try to TransferFrom " +TRANSFER_AMOUNT +" MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT");
      await token.transferFrom(MAIN_ACCOUNT, RECEIVING_ACCOUNT, TRANSFER_AMOUNT, {from: SPENDER_ACCOUNT});
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


  it('Standard23Token #8 should throw an error when trying to transferFrom to 0x0', async function() {
    console.log("Standard23Token #8 BEGIN==========================================================");

    let token = await Standard23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);

    let mainAccountBalanceBeforeTransfer = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeTransfer=" +mainAccountBalanceBeforeTransfer);
    assert.equal(mainAccountBalanceBeforeTransfer, INITAL_SUPPLY);

    let spenderAccountBalanceBeforeTransfer = await token.balanceOf(SPENDER_ACCOUNT);
    console.log("spenderAccountBalanceBeforeTransfer=" +spenderAccountBalanceBeforeTransfer);
    assert.equal(spenderAccountBalanceBeforeTransfer, 0);

    await token.approve(SPENDER_ACCOUNT, APPROVE_AMOUNT);
    console.log("APPROVE_AMOUNT = " +APPROVE_AMOUNT);

    try {
      let transfer = await token.transferFrom(MAIN_ACCOUNT, 0x0, APPROVE_AMOUNT, {from: SPENDER_ACCOUNT});
      assert.fail('should have thrown before');
    } catch(error) {
      let mainAccountBalanceAfterTransfer = await token.balanceOf(MAIN_ACCOUNT);
      console.log("mainAccountBalanceAfterTransfer =" +mainAccountBalanceAfterTransfer);
      assert.equal(mainAccountBalanceAfterTransfer, INITAL_SUPPLY);

      let spenderAccountBalanceAfterTransfer = await token.balanceOf(SPENDER_ACCOUNT);
      console.log("spenderAccountBalanceAfterTransfer =" +spenderAccountBalanceAfterTransfer);
      assert.equal(spenderAccountBalanceAfterTransfer, 0);
      assertJump(error);
    }
  });

  describe('Standard23Token #9 validating allowance updates to spender', function() {
    console.log("Standard23Token #9 BEGIN==========================================================");

    it('Approval should start with zero and should increase by 50 then decrease by 10', async function() {
      
      let preApproved;
      let token = await Standard23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY);
  
      preApproved = await token.allowance(MAIN_ACCOUNT, SPENDER_ACCOUNT);
      console.log("preApproved = " +preApproved);
      assert.equal(preApproved, 0);

      await token.increaseApproval(SPENDER_ACCOUNT, 50);
      console.log("Increse approval to  50");
      let postIncrease = await token.allowance(MAIN_ACCOUNT, SPENDER_ACCOUNT);
      console.log("PostIncrese allowance = " +postIncrease);
      assert.equal(postIncrease,50);
      
      await token.decreaseApproval(SPENDER_ACCOUNT, 10);
      console.log("Increse approval by 10");
      let postDecrease = await token.allowance(MAIN_ACCOUNT, SPENDER_ACCOUNT);
      console.log("postDecrease allowance = " +postDecrease);
      assert.equal(postDecrease,40);
    })
  });

});
