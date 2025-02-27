import {
    Connection,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
    Keypair,
    TransactionInstruction,
  } from "@solana/web3.js";
  

  describe("Hello world!", async() => {

    // Use Playground cluster connection
  const connection = pg.connection;
  
  // Use Playground wallet as sender, 
  const sender = pg.wallet.keypair;

  // Use newly deployed program as program id
  const PROGRAM_ID: PublicKey = new PublicKey ("9RPZPoZRUhqTzZsskocoAap6Exqwui2dJRPWosNa4yHf");

  it("hello", async() => {

    // Create a buffer for the data to be passed to the transfer instruction
    const instructionData = Buffer.alloc(0);
  
    // Instantiate TransactionInstruction class, serialize
    const instructionInstance = new TransactionInstruction({
        keys: [
            { pubkey: sender.publicKey, isSigner: true, isWritable: true },
        ],
        programId: PROGRAM_ID,
        data: instructionData,
    });
  
    // Instantiate Transaction class. Populate the "instruction" field.
    const transaction = new Transaction().add(instructionInstance);
    
    // Send the transaction to the network
    await sendAndConfirmTransaction(
      connection,
      transaction,
      [sender] // signer
    );

  });
  




  });
  
  
  