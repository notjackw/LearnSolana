import {
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
    Keypair,
    TransactionInstruction,
  } from "@solana/web3.js";
  
  // Use Playground cluster connection
  const connection = pg.connection;
  
  // Use Playground wallet as sender, 
  const sender = pg.wallet.keypair;
  console.log("sender pubkey: ", sender.publicKey);
  console.log("\n\n\n");
  
  // Generate random keypair as receiver
  const receiver = new Keypair();
  console.log("receiver pubkey: ", receiver.publicKey);
  console.log("\n\n\n");
  
  // Check and log balances before transfer
  const preBalance1 = await connection.getBalance(sender.publicKey);
  const preBalance2 = await connection.getBalance(receiver.publicKey);
  console.log("sender prebalance:", preBalance1 / LAMPORTS_PER_SOL);
  console.log("receiver prebalance:", preBalance2 / LAMPORTS_PER_SOL);
  console.log("\n");
  
  // Define the amount to transfer
  const transferAmount = 0.01; // 0.01 SOL
  
  // Instruction index for the SystemProgram transfer instruction
  const transferInstructionIndex = 2;
  
  // Create a buffer for the data to be passed to the transfer instruction
  const instructionData = Buffer.alloc(4 + 8); // uint32 + uint64
  
  // Write the instruction index to the buffer
  instructionData.writeUInt32LE(transferInstructionIndex, 0);
  
  // Write the transfer amount to the buffer
  instructionData.writeBigUInt64LE(BigInt(transferAmount * LAMPORTS_PER_SOL), 4);
  
  // Instantiate TransactionInstruction class, add keys, 
  const instructionInstance = new TransactionInstruction({
      keys: [
          { pubkey: sender.publicKey, isSigner: true, isWritable: true },
          { pubkey: receiver.publicKey, isSigner: false, isWritable: true }
      ],
      programId: SystemProgram.programId,
      data: instructionData
  });
  
  
  // Instantiate Transaction class. Populate the "instruction" field.
  const transaction = new Transaction();
  transaction.add(instructionInstance);
  
  // Send the transaction to the network
  const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [sender] // signer
  );
  
  // Check and log balance after transfer
  const postBalance1 = await connection.getBalance(sender.publicKey);
  const postBalance2 = await connection.getBalance(receiver.publicKey);
  
  console.log("sender postbalance:", postBalance1 / LAMPORTS_PER_SOL);
  console.log("receiver postbalance:", postBalance2 / LAMPORTS_PER_SOL);
  console.log("\n");
  
  console.log(
    "Transaction Signature:",
    `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  );
  