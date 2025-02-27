This is a higher-level example because the instructions are built using an API class, not the generic instruction class. Remember all instructions consist of the following fields:
- keys
- program ID
- data

Creating a token mint account requires a transaction filled with two instructions. 

The first instruction is made using SystemProgram API. It has the following fields:
- keys, which are instruction signer and the account being created
- program ID (auto-populated)
- data (auto-populated), which contains the size of account, rent amount, and key of program that will own the account. For Mint accounts, the owner must be Token Program account.

The second instruction similarly uses the API. Stuff is loaded into the keys, programID, and data field of a generic instruction.

Both instructions are put into a transaction which is sent across the network to a validator. Validator invokes the instructions, then sends back a transaction signature when complete. Then the client code returns.
