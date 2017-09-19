'use strict';

import expectThrow from '../installed_contracts/zeppelin-solidity/test//helpers/expectThrow';
var Mintable23Token = artifacts.require('../contracts/Tokens/Mintable23Token.sol');

contract('Mintable23Token', function(accounts) {
    let token;

    let MAIN_ACCOUNT = accounts[0];
    const INITAL_SUPPLY = 100;

    beforeEach(async function() {
        token = await Mintable23Token.new();
    });

        
    it('Mintable23Token #1 should start with a totalSupply of 0', async function() {
        console.log("Mintable23Token #1 BEGIN==========================================================");
        let totalSupply = await token.totalSupply();
      
        assert.equal(totalSupply, 0);
    });

    it('Mintable23Token #2 should return mintingFinished false after construction', async function() {
        console.log("Mintable23Token #2 BEGIN==========================================================");
        let mintingFinished = await token.mintingFinished();

        assert.equal(mintingFinished, false);
    });

    it('Mintable23Token #3 should mint a given amount of tokens to a given address', async function() {
        console.log("Mintable23Token #3 BEGIN==========================================================");

        let mainAccountBalanceBeforeMint = await token.balanceOf(MAIN_ACCOUNT);
        console.log("mainAccountBalanceBeforeMint = " +mainAccountBalanceBeforeMint +" should equal to 0 ");
        assert.equal(mainAccountBalanceBeforeMint, 0);

        const result = await token.mint(MAIN_ACCOUNT, INITAL_SUPPLY);

        let mainAccountBalanceAfterMint = await token.balanceOf(MAIN_ACCOUNT);
        console.log("mainAccountBalanceAfterMint = " +mainAccountBalanceAfterMint +" should equal to INITAL_SUPPLY =" +INITAL_SUPPLY);
        assert.equal(mainAccountBalanceAfterMint, INITAL_SUPPLY);

    
        let totalSupplyAfterMint = await token.totalSupply();
        console.log("totalSupplyAfterMint = " +totalSupplyAfterMint +" should equal to INITAL_SUPPLY =" +INITAL_SUPPLY);
        assert(totalSupplyAfterMint, INITAL_SUPPLY);
    });

    it('Mintable23Token #4 should fail to mint after call to finishMinting', async function () {
        console.log("Mintable23Token #4 BEGIN==========================================================");

        let mainAccountBalanceBeforeMint = await token.balanceOf(MAIN_ACCOUNT);
        console.log("mainAccountBalanceBeforeMint = " +mainAccountBalanceBeforeMint +" should equal to 0");
        assert.equal(mainAccountBalanceBeforeMint, 0);

        await token.finishMinting();
        assert.equal(await token.mintingFinished(), true);
        await expectThrow(token.mint(MAIN_ACCOUNT, INITAL_SUPPLY));


        let mainAccountBalanceAfterMint = await token.balanceOf(MAIN_ACCOUNT);
        console.log("mainAccountBalanceAfterMint = " +mainAccountBalanceAfterMint +" should equal to 0");
        assert.equal(mainAccountBalanceAfterMint, 0);
    });

});
