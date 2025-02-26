This mint account (a data account) is owned by the Token Extension Program account. Token Extension Program account is one of the SPL accounts.

The data it contains is info about a certain token.

Serialization lesson:
Accounts on the blockchain all have the same fields, and are stored as compiled binary data. The getAccountInfo function puts that binary data into a buffer and interprets it according to the established format. It produces a JS object which is human readable.