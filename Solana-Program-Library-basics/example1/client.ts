import { PublicKey } from "@solana/web3.js";

const address = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
const accountInfo = await pg.connection.getAccountInfo(address);

console.log(JSON.stringify(accountInfo, null, 2));