import web3
from web3 import Web3, HTTPProvider, TestRPCProvider
from web3.contract import ConciseContract
import sys

from .contract_import import ContractImport
    
w3 = Web3(TestRPCProvider())

contract = w3.eth.contract("abi", bytecode
