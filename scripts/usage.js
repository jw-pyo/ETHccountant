/* This file is reference for using smart contract function after migration 
 * */
var accounts = ["0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
                "0xf17f52151EbEF6C7334FAD080c5704D77216b732",
                "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"];


var fs = require("fs");
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var gmed_json = JSON.parse(fs.readFileSync("../build/contracts/Gmed.json"));
var crowd_json = JSON.parse(fs.readFileSync("../build/contracts/Crowdsale.json"));
var gmed_abi = gmed_json.abi;
var crowd_abi = crowd_json.abi;
var gmed_Contract = web3.eth.contract(gmed_abi);
var crowd_Contract = web3.eth.contract(crowd_abi);
//If you wanna import already deployed contract : use "at"
gmed_contract = gmed_Contract.at("0xf25186b5081ff5ce73482ad761db0eb0d25abfbf");
crowd_contract = crowd_Contract.at("0x9fbda871d559710256a2502a2517b794b482db40");
//If not, use "new"
//contract = Contract.new("contract's constructor arguments, {data: byteCode, from: web3.eth.accounts[0], gas: 4700000});

//console.log(crowd_contract.getTotalSupply());
/*Crowdsale.sol*/
//hasEnded() bool
//getTokenAmount(ether) uint256

console.log(crowd_contract.hasEnded());
console.log(gmed_contract.getBalanceOf(accounts[0]));
//console.log(crowd_contract.forwardFunds(5));
//call the fallback function
web3.eth.sendTransaction({
    from: accounts[1],
    to: crowd_contract.address,
    //data: ,
    //gas: ,
    value: web3.toWei(70, 'ether')
});
