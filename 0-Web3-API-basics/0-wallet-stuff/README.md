Web3.js API overview:
This API provides libraries for a client to interact with the solana blockchain. The library does all of the low-level network requests to send client stuff to the cluster. 
Specifically, this API interacts with the blockchain in 2 ways- it creates,signs,sends transaction objects to the cluster, and it can send a read-only account query to the cluster.

This uses the Solana Web3.js API to print some account info.
Note that your wallet has the same Account fields as all other account types (program accounts). 
Here we have a JavaScript object converted into a JSON string. This looks similar to the Rust Account struct.

Networking lesson:
The getAccountInfo function performs a network request on your computer. It sends a read-only account query to the cluster and receives a response.