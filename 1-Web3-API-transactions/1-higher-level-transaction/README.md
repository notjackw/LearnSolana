Before (example 0): We create an instruction by using the generic TransactionInstruction class and specifying the system program, and the index to the transfer struction. This is a way more manual process.

Now: We create an instruction by using the web3api's SystemProgram interface. This is much easier.

More clarification on what is happening: this is a transaction that invokes the system program's transfer instruction. This is one of the 5 transaction types: 
1. invoking a program transaction ****
2. transfer of tokens transaction
3. create an account transaction (deploying a program, create wallet/token account)
4. stake transactions
5. close account transaction

All transaction types have a transaction fee. Notice that some additional SOL was taken from the sender account to pay the fee. Additional fees include rent SOL if the transaction is creating an account.