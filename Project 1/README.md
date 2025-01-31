# Project 1: Basic transaction using playground cluster and the Web3.js client API.

Fully just copied some of this code from solana docs lol. But the value-add is extra comments, logging, and this README.

To run this code, go to https://beta.solpg.io/ and create a new project (any type: Anchor, Native, etc.), then copy my client file into /client/client.ts. Click run in the web interface, look at the console.

We are using the Web3.js API for making solana blockchain interactions easier. It provides a library of classes and functions that the developer uses. The developer's end goal is to create a `Transaction` object (filling out the correct fields and whatnot) and pass it into a `sendTransaction` function. 

Then the dev calls `$ node ./client.ts`. The file starts executing. The `Transaction` object is loaded into the `send` function and execution jumps to your local copy of the web3 library. The library connects to a validator over HTTP and sends your compiled transaction. The API listens on a port for an HTTP reponse. The API prints the response to your console.

## connect to devnet
```ts
// Use Playground cluster connection
const connection = pg.connection;
```
The playground automatically brings into scope a ```mod playground``` that is automatically populated when you open a playground project. One of them is ```const connection``` which does the following manual operation: ```const connection = new Connection(clusterUrl, "confirmed");```. It probably connects to the devnet, and is comparable to making a connection instance in X dev environment. Provides helper functions that interact with the devnet chain.

## sender pubkey
```ts
// Use Playground wallet as sender, 
const sender = pg.wallet.keypair;
console.log("sender pubkey: ", sender.publicKey.toBase58());
```
One of the auto-populated fields in ```mod playground``` is a wallet that is airdropped some faucet SOL. This wallet is visible in Solana explorer.

## check balances
```ts
// Check and log balances before transfer
const preBalance1 = await connection.getBalance(sender.publicKey);
```
The playground module's ```connection``` field has helper that interacts with the devnet.

## The API's TransactionInstruction class
```ts
// Instantiate TransactionInstruction class
const instructionInstance = new TransactionInstruction({
    keys: [
        { pubkey: sender.publicKey, isSigner: true, isWritable: true },
        { pubkey: receiver.publicKey, isSigner: false, isWritable: true }
    ],
    programId: SystemProgram.programId,
    data: instructionData
});
```
The web3.js API provides a TransactionInstruction class. 
- The first field is `keys`, becuase all Solana instructions will require a sender key and a receiver key. 
- The second field is programID. This specifies which program account holds the instruction we will be executing.
- The third field is data, which holds a serialized buffer. The first part of the buffer says which instruction within the program account we want to execute. The second part of the buffer holds instruction-specific parameters, which in our case is transferAmount.

This code is sent as-is to the validators (aka the Solana runtime). The validator will unpack this object, look for the program's address in its local copy of the blockchain, and copy the program's bytecode into its local memory. Then it expects the rest of your TransactionInstruction object to provide the arguments needed for that instruction (transferAmount). Then it loads those args into the bytecode and runs it.

## The API's Transaction class
```ts
// Instantiate Transaction class. Populate the "instruction" field.
const transaction = new Transaction();
transaction.add(instructionInstance);
```
The only responsibility of the Transaction object is to bundle multiple instructions. Specifically, it loads them into its member `Vec!<TransactionInstruction>`. 

## The API connects, sends, and receives receipt
```ts
// Use Playground wallet as sender, 
const sender = pg.wallet.keypair;

// ...

// Send the transaction to the network
  const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [sender] // signer
  );
```
The Web3.js API provides ```sendAndConfirmTransaction()``` function which does some logic before sending the `Transaction` object to the network. The  has 3 responsibilities:
- Signs the transaction. In this code we pass the sender's entire keypair because the function generates a digital signature from the private key, then updates a field in the `Transaction` object, which had not been filled out yet. 
- Connects to the specified network. Playground automatically set `pg.connection.URL()` with the devnet URL. 
- Serializes your `Transaction` object into a JSON that the validator will understand. Sends it over the network, listen on a port for a response, pipe that response into your console.