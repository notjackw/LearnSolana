# Project 1: Basic transaction using playground cluster and the Web3.js client API.

Fully just copied some of this code from solana docs lol. But the value-add is extra comments, logging, and this README.

To run this code, go to https://beta.solpg.io/ and create a new project (any type: Anchor, Native, etc.), then copy my client file into /client/client.ts. Click run in the web interface, look at the console.

We are using the Web3.js API for making solana blockchain interactions easier. It provides a library of classes and functions that the developer uses. The developer's end goal is to create a `Transaction` object (filling out the correct fields and whatnot) and pass it into a `sendTransaction` function. 

Then the dev calls `$ node ./client.ts`. The file starts executing locally. The `Transaction` object is loaded into the `send` function and execution jumps to the definition in your local copy of the web3 library. The library connects to a validator over HTTP and sends the passed-in Transaction object. The API listens on a port for an HTTP reponse from the validator. The API prints the response to your console.

## connect to devnet
```ts
// Use Playground cluster connection
const connection = pg.connection;
```
The playground environment automatically brings into scope a ```mod playground``` which has a pre-configured ```connection``` field. This is a standard ```Connection``` object from the web3.js API. The playground populates it by doing the following manual operation: ```const connection = new Connection(clusterUrl, "confirmed");```. Connection instance provides helper functions that interact with the devnet chain.

## sender pubkey
```ts
// Use Playground wallet as sender, 
const sender = pg.wallet.keypair;
console.log("sender pubkey: ", sender.publicKey.toBase58());
```
Another field of the ```pg``` object is the pre-configured ```wallet``` field, which stores a keypair. The playground does the following manual operation to populate it: ```const wallet = Keypair.generate();```. The playground automatically airdrops some SOL into the wallet address, which requires the following manual operation: ```connection.requestAirdrop(wallet.publicKey, 1 * LAMPORTS_PER_SOL); ```. This wallet is visible in Solana explorer.

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

This code is sent as-is to the validators (aka the Solana runtime). The validator will unpack this object, look for the program's address in its local copy of the blockchain, then copy the program's bytecode into its local memory. Then it decodes the ```data``` argument to see which instruction is specified, sets up the parameter formats expected by the instruction, and calls the function's bytecode. This reporitory's ```Project 2``` will cover this part in more detail.

## The API's Transaction class
```ts
// Instantiate Transaction class. Populate the "instruction" field.
const transaction = new Transaction();
transaction.add(instructionInstance);
```
The only responsibility of the Transaction object is to bundle multiple TransferInstruction objects. Specifically, it loads them into its member `Vec!<TransactionInstruction>`. 

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
The Web3.js API provides ```sendAndConfirmTransaction()``` function which does some logic before sending the `Transaction` object to the network. The logic does 3 things:
- Signs the transaction. In this code we pass the sender's entire keypair because the function generates a digital signature from the private key, then updates the ```digital_signature``` field in the `Transaction` object, which had not been filled out yet. 
- Connects to the specified network via HTTP. Playground automatically set `pg.connection.URL()` with the devnet URL. 
- Serializes your `Transaction` object into a JSON that the validator will understand. Sends it over the network, listen on a port for a response, pipe that response into your console.

## The Validator
Q&A:
- what physical computers receive the transaction object?
-- any computer that is running a validator. That computer's IP needs to be added to the devnet URL DNS records. Any transaction you send to the devnet is received by all IPs in the domain's registry.

The validator does a lot of stuff, but not necessary to talk about all of it here. It does these things for our transaction:
- digital signature --> function --> public key
It runs the digital signature through a function and gets a public key. It checks that the resulting public key exists on the blockchain and has the Lamport balance needed.

- 

## Output
```
Transaction Signature: https://explorer.solana.com/tx/79QGGTARtTrPLKWUh3x1WTq1LW2KwyKRCK4Kk7JNkHeRg5RVyfj447QuVPK7hFa7XsYHi9ffX5Zkz7Jp6A2qD2j?cluster=devnet
```
The only discussion-worthy part of the output is the returned transaction signature. 