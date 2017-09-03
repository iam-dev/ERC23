'use strict';


const assertJump = require('./helpers/assertJump');
var ClientStandard23TokenMock = artifacts.require('../contracts/ClientStandard23Token.sol');

contract('ClientStandard23TokenMock', function(accounts) {
  let MAIN_ACCOUNT = accounts[0];
  let RECEIVING_ACCOUNT = accounts[1];
  let SPENDER_ACCOUNT = accounts[2]

  const INITAL_SUPPLY = 100000000 * Math.pow(10,18);
  const TRANSFER_AMOUNT = 100;
  const APPROVE_AMOUNT = 40;

  let tokenName = "Dummy Token";
  let tokenSymbol = "DM";
  let tokenDecimals = 18;


  it('ClientStandard23TokenMock #1 should return the correct information after construction', async function() {
    console.log("ClientStandard23TokenMock #1 BEGIN==========================================================");
    console.log("What is the totalSupply of the created Token?");

    let token = await ClientStandard23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY, tokenName, tokenSymbol, tokenDecimals);
    let tokenAddress = token.address;
    console.log("tokenAddress =  " +tokenAddress);

    let totalSupply = await token.totalSupply();
    console.log("The totalSupply of the created Token should equal to " +totalSupply);
    assert.equal(totalSupply, INITAL_SUPPLY);

    let name =  await token.name();
    console.log("The Token name should be equal to " +web3.toAscii(name));
    assert.equal(web3.toAscii(name).replace(/\u0000/g, ''), tokenName);

    let symbol =  await token.symbol();
    console.log("The Token symbol should be equal to " +web3.toAscii(symbol));
    assert.equal(web3.toAscii(symbol).replace(/\u0000/g, ''), tokenSymbol);

    let decimals = await token.decimals();
    console.log("The Token decimals should be equal to " +decimals);
    assert.equal(decimals, tokenDecimals);


    console.log("What is the balance of MAIN_ACCOUNT?");
    let mainAccountBalance = await token.balanceOf(MAIN_ACCOUNT);
    console.log("The balance of the MAIN_ACCOUNT  should be equal to " +mainAccountBalance);
    assert.equal(mainAccountBalance, INITAL_SUPPLY);

    console.log("What is the balance of token Address?");
    let tokenAddressBalance = await token.balanceOf(tokenAddress);
    console.log("The balance of the tokenAddressBalance  should be equal to " +tokenAddressBalance);
    assert.equal(tokenAddressBalance, 0);
  });
  
  it('ClientStandard23TokenMock #2 should return the correct information after changing information', async function() {
    console.log("ClientStandard23TokenMock #2 BEGIN==========================================================");

    let token = await ClientStandard23TokenMock.new(MAIN_ACCOUNT, INITAL_SUPPLY, tokenName, tokenSymbol, tokenDecimals);

    let newName = "Change the Token name";
    await token.setName(newName);

    let name =  await token.name();
    console.log("The Token name should be equal to " +web3.toAscii(name));
    assert.equal(web3.toAscii(name).replace(/\u0000/g, ''), newName);

    let newSymbol = "Change the Token symbol";
    await token.setSymbol(newSymbol);
    let symbol =  await token.symbol();
    console.log("The Token symbol should be equal to " +web3.toAscii(symbol));
    assert.equal(web3.toAscii(symbol).replace(/\u0000/g, ''), newSymbol);

    let newDecimals = 0;
    await token.setDecimals(0);
    let decimals = await token.decimals();
    console.log("The Token decimals should be equal to " +decimals);
    assert.equal(decimals, newDecimals);
  });

  it('ClientStandard23TokenMock #3 should return the correct information after changing totalSupply', async function() {
    console.log("ClientStandard23TokenMock #3 BEGIN==========================================================");

    let token = await ClientStandard23TokenMock.new(MAIN_ACCOUNT, 100, tokenName, tokenSymbol, tokenDecimals);
    let tokenAddress = token.address;

    let mainAccountBalanceBeforeChangeSupply = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceBeforeChangeSupply =  " +mainAccountBalanceBeforeChangeSupply);
    assert.equal(mainAccountBalanceBeforeChangeSupply, 100);
    
    let addSupply = 100;
    
    await token.addSupply(addSupply);
    
    let totalSupply = await token.totalSupply();
    console.log("The totalSupply should be changed to " +totalSupply);
    assert.equal(totalSupply, 100+addSupply);

    let mainAccountBalanceAfterAddSupply = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceAfterAddSupply =  " +mainAccountBalanceAfterAddSupply);
    assert.equal(mainAccountBalanceAfterAddSupply, 100+addSupply);

    let subSupply = 150;
    await token.subSupply(subSupply);
    
    let totalSupplyAfterSub = await token.totalSupply();
    console.log("The totalSupply should be changed to " +totalSupplyAfterSub);
    assert.equal(totalSupplyAfterSub, (100+addSupply)-subSupply);

    let mainAccountBalanceAfterSubSupply = await token.balanceOf(MAIN_ACCOUNT);
    console.log("mainAccountBalanceAfterSubSupply =  " +mainAccountBalanceAfterSubSupply);
    assert.equal(mainAccountBalanceAfterSubSupply, (100+addSupply)-subSupply);

  });
});