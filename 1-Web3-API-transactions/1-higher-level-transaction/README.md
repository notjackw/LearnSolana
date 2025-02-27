The instruction is build in a way easier way compared to the previous example.

Before (example 0): We create an instruction by loading the following into a generic TransactionInstruction class. This is the lowest level format for all instructions.
- keys
- system program ID
- data, which contains lamport amount and the index to the transfer instruction

Now: We create an instruction by loading the following into the web3api's SystemProgram class. The lowest level instruction format is still used but is abstracted in this case. The API autopopulates the programID field and data field, which still contains lamport amount and index.
- keys
- lamport amount

More clarification on what is happening: this is a transaction that invokes the system program's transfer instruction. This is one of the 5 transaction types: 
1. invoking a program transaction ****
2. transfer of tokens transaction
3. create an account transaction (deploying a program, create wallet/token account)
4. stake transactions
5. close account transaction

All transaction types have a transaction fee. Notice that some additional SOL was taken from the sender account to pay the fee. Additional fees include rent SOL if the transaction is creating an account.