/*
 * Initial Settings
 */
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var fs = require("fs");
var accounts = JSON.parse(fs.readFileSync("../../info.json")).accounts_tera3;
var logfile = fs.createWriteStream("../log/event.log");
    logfile.on('error', (err) => { console.log(err) });

var sb_json = JSON.parse(fs.readFileSync("../../build/contracts/Smallbank.json"));
var sb_abi = sb_json.abi;
var sb = new web3.eth.Contract(sb_abi, "0x345ca3e014aaf5dca488057592ee47305d9b3e10", {
    from: accounts[0]
});
////////////////////////////////////////////////////////////////////////////////

main()
/* get block number */

async function blockNumber() { web3.eth.getBlockNumber(function(error, blockNumber){
    if(error)
        console.log(error);
    else {
        console.log("current block Number: ", blockNumber);
        return blockNumber;
    }
});
}


/* get block info */

async function getBlock() { 
    web3.eth.getBlock(blockNumber, function(error, result){
        if(!error)
            console.log(JSON.stringify(result));
        else
            console.error(error);
    })
}

/* call the contract function */

async function update_balance() {
    sb.methods.updateBalance(accounts[1], 20000).send({from: accounts[0]})
    .on('receipt', function(receipt) {
        console.log(receipt);
    })
    sb.methods.updateBalance(accounts[1], 30000).send({from: accounts[0]})
    sb.methods.updateBalance(accounts[1], 40000).send({from: accounts[0]})
}

/* fetch the events */

async function fetchEvent() { 
    sb.getPastEvents('UpdateBalance', {
        fromBlock: 0,
        toBlock: await blockNumber()
    }, function(error, events) {
        events.forEach(each_event => {
            console.log(JSON.stringify(each_event.returnValues))
            logfile.write(JSON.stringify(each_event.returnValues)+"\n")
        })
    })
    .then(() => {
        logfile.end()
    })
}

async function main() {
    await fetchEvent();
}










