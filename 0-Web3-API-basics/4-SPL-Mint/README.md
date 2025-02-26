The getMint function comes from the @solana/spl-token library, which is a helper library for the SPL account "Token Extension Program". All SPL accounts have helper libraries!!

Serialization lesson continued:

The getMint function internally calls getAccountInfo to turn the account (in binary format) into another JS object. However, as part of the deserialization process, it ignores all of the standard account fields (executable, owner, lamports, etc.) and only interprets the data field. This field contains a serialized Mint object.