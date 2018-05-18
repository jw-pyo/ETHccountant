//const web3 = require("Web3");
const Smallbank = artifacts.require("./Smallbank.sol");

contract('Smallbank', function(accounts) {
    let smallbank
    let owner
    beforeEach('setup contract for each test', async function() {
        smallbank = await Smallbank.new()
        owner = accounts[0]
    })

    it('update balance for account 1', async function() {
        await smallbank.updateBalance(accounts[1], 20000, {from: owner})
        assert.equal(await smallbank.getBalance(accounts[1]), 20000)
    })

    it('print event log', async function() {
        /*var filter = web3.eth.filter({
            'fromBlock': 0,
            'toBlock' : 'latest',
            'address' : smallbank.address,
            'topics' :[
                web3.keccak256('UpdateBalance(address,uint)')
            ]
        });*/
        await smallbank.updateBalance(accounts[1], 20000, {from: owner})
        await smallbank.updateBalance(accounts[1], 20000, {from: owner})
        await smallbank.updateBalance(accounts[1], 20000, {from: owner})
        var Event = smallbank.UpdateBalance({}, {fromBlock: 0, toBlock: 'latest'});
        Event.get(function (err, results) {
            if(!err) {
                results.forEach(result => console.log(result.args))
            }
        });
    })





});
