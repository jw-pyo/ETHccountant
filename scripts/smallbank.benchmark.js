//const web3 = require("web3");
var accounts = [
"0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1",
"0xffcf8fdee72ac11b5c542428b35eef5769c409f0",
"0x22d491bde2303f2f43325b2108d26f1eaba1e32b",
"0xe11ba2b4d45eaed5996cd0823791e0c93114882d",
"0xd03ea8624c8c5987235048901fb614fdca89b117",
"0x95ced938f7991cd0dfcb48f0a06a40fa1af46ebc",
"0x3e5e9111ae8eb78fe1cc3bb8915d5d461f3ef9a9",
"0x28a8746e75304c0780e011bed21c72cd78cd535e",
"0xaca94ef8bd5ffee41947b4585a84bda5a3d3da6e",
"0x1df62f291b2e969fb0849d99d9ce41e2f137006e"
];


var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var fs = require("fs");

const smallbank = artifacts.require("./smallbank.sol");
var filepath = "../client/log/event.log";
var file = new File(filepath);

file.open("w");


var sb_json = JSON.parse(fs.readFileSync("../build/contracts/Small.json"));
var sb_abi = sb_json.abi;
var sb_Contract = web3.eth.contract(sb_abi);
sb = sb_Contract.at("0xcfeb869f69431e42cdb54a4f4f105c19c080a601");

sb.updatebalance(accounts[1], 20000, {from: owner})
sb.updatebalance(accounts[1], 30000, {from: owner})
sb.updatebalance(accounts[1], 40000, {from: owner})

var event = sb.updatebalance({}, {fromblock: 0, toblock: 'latest'});

event.get(function (err, results) {
    if(!err) {
        results.foreach(result => file.writeln(result.args))
    }
})

file.close();


