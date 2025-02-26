import { PublicKey } from "@solana/web3.js";
import { getMint, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

const address = new PublicKey("C33qt1dZGZSsqTrHdtLKXPZNoxs6U1ZBfyDkzmj6mXeR");
const mintData = await getMint(
  pg.connection,
  address,
  "confirmed",
  TOKEN_2022_PROGRAM_ID,
);

console.log(
  JSON.stringify(
    mintData,
    (key, value) => {
      // Convert BigInt to String
      if (typeof value === "bigint") {
        return value.toString();
      }
      // Handle Buffer objects
      if (Buffer.isBuffer(value)) {
        return `<Buffer ${value.toString("hex")}>`;
      }
      return value;
    },
    2,
  ),
);