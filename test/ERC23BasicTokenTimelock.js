const BigNumber = web3.BigNumber

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

import latestTime from '../installed_contracts/zeppelin-solidity/test/helpers/latestTime';
import {increaseTimeTo, duration} from '../installed_contracts/zeppelin-solidity/test/helpers/increaseTime';

const UpgradeableStandard23TokenMock = artifacts.require('../helpers/UpgradeableStandard23TokenMock.sol');
const ERC23BasicTokenTimelock = artifacts.require('./contracts/ERC23BasicTokenTimelock.sol');

contract('ERC23BasicTokenTimelock', function ([_, owner, beneficiary]) {


    let tokenName = "Upgradeable Token";
    let tokenSymbol = "UT";
    let tokenDecimals = 18;

    const amount = new BigNumber(100)

    beforeEach(async function () {
        this.token = await UpgradeableStandard23TokenMock.new({from: owner}, amount, tokenName, tokenSymbol, tokenDecimals);
        this.releaseTime = latestTime() + duration.years(1)
        this.timelock = await ERC23BasicTokenTimelock.new(this.token.address, beneficiary, this.releaseTime)
        await this.token.transfer(this.timelock.address, amount)
    });

    it('cannot be released before time limit', async function () {
        await this.timelock.release().should.be.rejected
    });

    it('cannot be released just before time limit', async function () {
        await increaseTimeTo(this.releaseTime - duration.seconds(3))
        await this.timelock.release().should.be.rejected
    });

    it('can be released just after limit', async function () {
        await increaseTimeTo(this.releaseTime + duration.seconds(1))
        await this.timelock.release().should.be.fulfilled
        const balance = await this.token.balanceOf(beneficiary)
        balance.should.be.bignumber.equal(amount)
    });

    it('can be released after time limit', async function () {
        await increaseTimeTo(this.releaseTime + duration.years(1))
        await this.timelock.release().should.be.fulfilled
        const balance = await this.token.balanceOf(beneficiary)
        balance.should.be.bignumber.equal(amount)
    });

    it('cannot be released twice', async function () {
        await increaseTimeTo(this.releaseTime + duration.years(1))
        await this.timelock.release().should.be.fulfilled
        await this.timelock.release().should.be.rejected
        const balance = await this.token.balanceOf(beneficiary)
        balance.should.be.bignumber.equal(amount)
    });

})
