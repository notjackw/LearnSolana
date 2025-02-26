Creating a token mint account requires a transaction filled with two instructions. 
- First we create an instruction using SystemProgram.createAccount. The payer of rent is the sender wallet; pubkey for the new account; the owner of the account is SPL Token program ID.
- Then we create an instruction for 
Here we add two instructions to the transaction object, and then send the transaction object in the same way.