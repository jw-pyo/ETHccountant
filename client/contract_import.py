from web3 import Web3, HTTPProvider, TestRPCProvider
from web3.contract import ConciseContract
#from solc import compile_source
import json
import sys

class contractImport():
    def __init__(self, path="Smallbank.json"):
        self.w3 = Web3(HTTPProvider())
        self.path = "../build/contracts/"+path
    def new(self, deployer, gas, isConcise=True):
        #deployer = args[0]
        #gas = args[1]
        """
        with open("../contracts/Smallbank.sol", "r") as f:
            compiled_sol = compile_source(f.read())
            contract_interface = compiled_sol['<stdin>:Smallbank']
        """
        with open(self.path, "r") as f:
            contract_json = json.loads(f.read())
        contract_abi, contract_bytecode = contract_json["abi"], contract_json["bytecode"]
        contract = self.w3.eth.contract(
                abi=contract_abi,
                bytecode=contract_bytecode
        )
        
        tx_hash = contract.deploy(transaction={
            'from': deployer,
            'gas' : gas
        })

        tx_receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)

        contract_instance = self.w3.eth.contract(
                address=tx_receipt.contractAddress,
                abi = contract_abi
        )
        
        #print
        print("="*40+"\n"+"New deployed address of [{}]: {}".format(
            self.path.split("/")[-1],
            contract_instance.address)+"\n"+"="*40+"\n"
        ) 
        
        if isConcise:
            concise_instance = ConciseContract(contract_instance)
            return concise_instance
        return contract_instance

    def deployed(self, address):
        with open(self.path, "r") as f:
            contract_json = json.loads(f.read())
        contract_abi = contract_json["abi"]

        contract_instance = self.w3.eth.contract(
                address=address,
                abi=contract_abi)
        return contract_instance

if __name__ == "__main__":
    w3 = Web3(HTTPProvider())
    #ctrt = contractImport(path="Smallbank.json").new(w3.eth.accounts[0], 400000, isConcise=False)
    ctrt = contractImport(path="Smallbank.json").deployed("0x074bF216979389dE24F0684feC80790a8c2D2508")
    tx = {
        "from" : w3.eth.accounts[0],
        "gas" : 400000
    }
    tx_get = {
        "from" : w3.eth.accounts[0]
    }
    #conciseContract method call

    tx_hash1 = ctrt.functions.updateBalance(w3.eth.accounts[1], 500000000).transact(tx).hex()
    tx_hash2 = ctrt.functions.getBalance(w3.eth.accounts[1]).transact(tx_get).hex()
    print(tx_hash1, tx_hash2)
    tx_receipt1 = w3.eth.waitForTransactionReceipt(tx_hash1)
    tx_receipt2 = w3.eth.getTransactionReceipt(tx_hash2)

    events = ctrt.events.UpdateBalance().processReceipt(tx_receipt1)
    print(events)


    transfer_filter = ctrt.eventFilter('UpdateBalance', 
            {
                'filter': 
                    {
                        'addr': w3.eth.accounts[1]
                    }
            }
    )
    print(transfer_filter.get_new_entries())
    print(transfer_filter.get_all_entries())




