# LearnSolana

This repo contains super basic solana projects including:
- Project 1: Using the Web3.js client API to interact with the Solana Playground cluster and the Solana runtime.

# Blockchain basics:
Here is the control flow of a transaction.

## The client
Your computer has a local copy of the web3.js API. This API does some logic that interacts with validators via HTTP. The API on your computer is the RPC node.

## The blockchain
The blockchain is a linked list, where each node (aka "block") in the list contains metadata from a transaction. One block per transaction.

## Accounts
Accounts are NOT PART OF THE BLOCKCHAIN. They are part of the blockchain ecosystem, yes, but they are not stored in a linkedlist node with the rest of the blocks. 

## "The Ledger"
A term for a physical copy of the entire blockchain and all accounts. Every validator stores a local copy of the ledger. The ledger currently takes up 300TB of storage. The split between how much storage the blockchain takes up vs. how much the account data takes up is not publicly known. However, the max Account size is 10MB and the max transaction size is 10kB.

## Validator
There are 4,000 validators running in the world.
That computer's IP needs to be added to the devnet URL DNS records. Any transaction you send to the devnet is received by all IPs in the domain's registry.





