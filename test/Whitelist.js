'use strict';
    
require('chai')
  .use(require('chai-as-promised'))
  .should()

const assertJump = require('../installed_contracts/zeppelin-solidity/test/helpers/assertJump');
var Whitelist = artifacts.require('../contracts/ownership/Whitelist.sol');

contract('Whitelist', function(accounts) {
    let whitelist;
    const MAX_ADDRESSES = 3;

    let MAIN_ACCOUNT = accounts[0];
    let ACCOUNT1 = accounts[1];
    let ACCOUNT2 = accounts[2];
    let ACCOUNT3 = accounts[3];

    var whitelists = [MAIN_ACCOUNT, ACCOUNT1, ACCOUNT2];

    beforeEach(async function() {
        whitelist = await Whitelist.new(whitelists, MAX_ADDRESSES);
    });

    it('Whitelist #1 should the correct information after construction', async function() {
        console.log("Whitelist #1. BEGIN==========================================================");

        let whitelists = await whitelist.getWhitelists();
         console.log("Array of Whitelist = " +whitelists);

        var ownerIsWhitelisted = await whitelist.checkWhitelisted(MAIN_ACCOUNT).should.be.fulfilled;

        let maxAddresses = await whitelist.maxAddresses();
        console.log("maxAddresses = " +maxAddresses +" should be equal to " +MAX_ADDRESSES);
        assert.equal(maxAddresses, MAX_ADDRESSES);
        
    });

    it('Whitelist #2 should be able to add an address to the whitelist', async function() {
        console.log("Whitelist #2. BEGIN==========================================================");

        await whitelist.addAddressToWhitelist(ACCOUNT3);

        var account3IsWhitelisted = await whitelist.checkWhitelisted(ACCOUNT3).should.be.fulfilled;;
        
    });

    it('Whitelist #3 should be able to remove an address to the whitelist', async function() {
        console.log("Whitelist #3. BEGIN==========================================================");

        await whitelist.removeAddressFromWhitelist(ACCOUNT2);

        var account2IsRemoved = await whitelist.checkWhitelisted(ACCOUNT2).should.be.rejected;

    });

});