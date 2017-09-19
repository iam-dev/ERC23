

var UpgradeableStandard23Token = artifacts.require("./UpgradeableStandard23Token.sol");
var Standard23TokenVault = artifacts.require("./Standard23TokenVault.sol");
var ExampleUpgradeable23Token = artifacts.require("./example/ExampleUpgradeable23Token.sol");
module.exports = function(deployer) {
	const OWNER = '0x0bE9FC0FC5d2696edF93F9256F6871217695B4B6';
	//const INVESTOR = 'c8b8c7054a16b0e9a03831de01e13670913a51e4029345b20d5fa9629bdb2dcd';
	const INITIAL_BALANCE = 300000000 * Math.pow(10*18);
	const NAME = 'Upgradeable Token';
	const SYMBOL = 'UT';
	const DECIMALS = 18;

	const releaseTime = 100;

	deployer.deploy(ExampleUpgradeable23Token, OWNER, INITIAL_BALANCE, NAME, SYMBOL, DECIMALS);
	//deployer.deploy(ExampleUpgradeable23Token, INITIAL_BALANCE);
	//var vault = deployer.deploy(Standard23TokenVault,OWNER, releaseTime, token.address, INITIAL_BALANCE);
	//ExampleToken.deployed().then(function(instance){token=instance})
	//var vault = Standard23TokenVault.new(OWNER, releaseTime, token.address, INITIAL_BALANCE);

	ExampleUpgradeable23Token.deployed().then(function(instance){
		token=instance
		return Standard23TokenVault.new(OWNER, releaseTime, token.address, INITIAL_BALANCE);
	});
	//Standard23TokenVault.deployed().then(function(instance){
	//	vault=instance;
	//	vault.setStateLoading();
	//	vault.setInvestor(INVESTOR, 100);
	//});

	

	//vault.setInvestor(INVESTOR, 100);
	//ExampleToken.deployed().then(function(instance){
	//	token=instance
		//return Standard23TokenVault.new(OWNER, releaseTime, token.address, INITIAL_BALANCE)
	//});
	
	//Standard23TokenVault.deployed().then(function(instance){vault=instance});

};

