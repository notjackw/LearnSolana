## Smart contract
Step 1 is to Build and deploy this to devnet
- The deploy button in playground creates a transaction with the instruction for SystemProgram create account, since we are creating a program account.

Serialization lesson:
```
let accounts_iter = &mut accounts.iter();
    let payer = next_account_info(accounts_iter)?;
    let system_program = next_account_info(accounts_iter)?;
```
here the program expects the first account in the vector to be a payer, and the second to be the system program. If the client creates the instruction incorrectly, the deserialization will be bad.

Validator lesson:
```
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
)
```
The program does not need to use the first argument. It doesn't need to know its own program ID. However the validator needs to know what program is associated with each instruction, and serialization would get messed up if we didn't include this.

## Test file
In the test file, we create a generic instruction and serialize the arguments in the exact way they are expected. We use the programID of the smart contract that was deployed. If we enter the arguments in the wrong order, deserialization will break.