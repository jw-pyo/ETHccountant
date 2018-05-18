var accounts = [
"0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
"0xf17f52151EbEF6C7334FAD080c5704D77216b732",
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

//const smallbank = artifacts.require("./smallbank.sol");
var logfile = fs.createWriteStream("../client/log/event.log");
logfile.on('error', (err) => { console.log(err) });


var sb_json = JSON.parse(fs.readFileSync("../build/contracts/Smallbank.json"));
var sb_abi = sb_json.abi;
var sb = new web3.eth.Contract(sb_abi, "0x8065f4c7b8c2bf53561af92d9da2ea022a0b28ca", {
    from: accounts[0]
});


sb.methods.updateBalance(accounts[1], 20000).send({from: accounts[0]})
/*.on('receipt', function(receipt) {
    console.log(receipt);
})*/
sb.methods.updateBalance(accounts[1], 30000).send({from: accounts[0]})
sb.methods.updateBalance(accounts[1], 40000).send({from: accounts[0]})

sb.getPastEvents('UpdateBalance', {
    fromBlock: 0,
    toBlock: "latest"
}, function(error, events) { 
    events.forEach(each_event => logfile.write(JSON.stringify(each_event.returnValues)+"\n"))
})
.then(() => {
    logfile.end()
})





/*
var update_event = sb.events.UpdateBalance({  
    fromBlock: 0,
    toBlock: 'latest'
}, function(err, events){ console.log(events); })
.on('data', function(event){
    console.log(event);
})
.on('error', console.error);
*/


/*
event.get(function (err, results) {
    if(!err) {
        results.foreach(result => fs.writeFile(filepath, result.args, function(err) {
            if(!err) console.log(result.args, filepath);
        })
                )
    }
})
*/

