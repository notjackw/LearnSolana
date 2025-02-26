import {
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
    Keypair,
  } from "@solana/web3.js";
  
  const sender = pg.wallet.keypair;
  const receiver = new Keypair();
  
  const transferInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver.publicKey,
    lamports: 0.01 * LAMPORTS_PER_SOL,
  });
  
  const transaction = new Transaction().add(transferInstruction);
  
  const transactionSignature = await sendAndConfirmTransaction(
    pg.connection,
    transaction,
    [sender],
  );
  
  console.log(
    "Transaction Signature:",
    `https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`,
  );