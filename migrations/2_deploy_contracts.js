var UpgradeableStandard23Token = artifacts.require("./UpgradeableStandard23Token.sol");

module.exports = function(deployer) {
	const OWNER = '0x12';
	const INITIAL_BALANCE = 300000000 * Math.pow(10*18);
	const NAME = 'Upgradeable Token';
	const SYMBOL = 'UT';
	const DECIMALS = 18;

	deployer.deploy(UpgradeableStandard23Token, OWNER, INITIAL_BALANCE, NAME, SYMBOL, DECIMALS);
};
