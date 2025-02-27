use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey
};

// function pointer
entrypoint!(process_instruction);

// anatomy of a generic instruction
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {

    let accounts_iter = &mut accounts.iter();
    let payer = next_account_info(accounts_iter)?;
    let system_program = next_account_info(accounts_iter)?;

    msg!("This program's program id: {}", &program_id);
    msg!("Signer's account id: {}", payer.key);
    msg!("SystemProgram account id: {}", system_program.key);

    Ok(())

}