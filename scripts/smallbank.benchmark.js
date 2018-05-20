/*
 * Initial Settings
 */
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var fs = require("fs");
var accounts = JSON.parse(fs.readFileSync("../info.json")).accounts;
var logfile = fs.createWriteStream("../client/log/event.log");
    logfile.on('error', (err) => { console.log(err) });

var sb_json = JSON.parse(fs.readFileSync("../build/contracts/Smallbank.json"));
var sb_abi = sb_json.abi;
var sb = new web3.eth.Contract(sb_abi, "0xf9630cb69194fce7f8f82cb2355356adb822a5f0", {
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
    events.forEach(each_event => {
        console.log(JSON.stringify(each_event.returnValues))
        logfile.write(JSON.stringify(each_event.returnValues)+"\n")
    })
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

