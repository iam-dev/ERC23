# ERC23 token standard
ERC23 is a superset of the ERC20 Ethereum token standaard.

Thanks to Dexaran
https://github.com/Dexaran/ERC23-tokens

### The main goals of developing ERC23 token standard were:
  1. Accidentally lost tokens inside contracts: there are two different ways to transfer ERC20 tokens depending on is the receiver address a contract or a wallet address. You should call `transfer` to send tokens to a wallet address or call `approve` on token contract then `transferFrom` on receiver contract to send tokens to contract. Accidentally call of `transfer` function to a contract address will cause a loss of tokens inside receiver contract where tokens will never be accessibe.
  2. Inability of handling incoming token transactions: ERC20 token transaction is a call of `transfer` function inside token contract. ERC20 token contract is not notifying receiver that transaction occurs. Also there is no way to handle incoming token transactions on contract and no way to reject any non-supported tokens.
  3. ERC20 token transaction between wallet address and contract is a couple of two different transactions in fact: You should call `approve` on token contract and then call `transferFrom` on another contract when you want to deposit your tokens into it.
  4. Ether transactions and token transactions behave different: one of the goals of developing ERC23 was to make token transactions similar to Ether transactions to avoid users mistakes when transferring tokens and make interaction with token transactions easier for contract developers.
  
### ERC23 advantages.
  1. Provides a possibility to avoid accidentally lost tokens inside contracts that are not designed to work with sent tokens.
  2. Allows users to send their tokens anywhere with one function `transfer`. No difference between is the receiver a contract or not. No need to learn how token contract is working for regular user to send tokens.
  3. Allows contract developers to handle incoming token transactions.
  4. ERC23 `transfer` to contract consumes 2 times less gas than ERC20 `approve` and `transferFrom` at receiver contract.
  5. Allows to deposit tokens intor contract with a single transaction. Prevents extra blockchain bloating. 
  6. Makes token transactions similar to Ether transactions.
  
ERC23 tokens are backwards compatible with ERC20 tokens. It means that ERC23 supports every ERC20 functional and contracts or services working with ERC20 tokens will work with ERC23 tokens correctly.
ERC23 tokens should be sent by calling `transfer` function on token contract with no difference is receiver a contract or a wallet address. If the receiver is a wallet ERC23 token transfer will be same to ERC20 transfer. If the receiver is a contract ERC23 token contract will try to call `tokenFallback` function on receiver contract. If there is no `tokenFallback` function on receiver contract transaction will fail. `tokenFallback` function is analogue of `fallback` function for Ether transactions. It can be used to handle incoming transactions. There is a way to attach `bytes _data` to token transaction similar to `_data` attached to Ether transactions. It will pass through token contract and will be handled by `tokenFallback` function on receiver contract. There is also a way to call `transfer` function on ERC23 token contract with no data argument or using ERC20 ABI with no data on `transfer` function. In this case `_data` will be empty bytes array.

ERC223 EIP https://github.com/ethereum/EIPs/issues/223
ERC20 EIP https://github.com/ethereum/EIPs/issues/20

 ### Lost tokens held by contracts
There is already a number of tokens held by token contracts themselves. This tokens will not be accessible as there is no function to withdraw them from contract. This tokens are **lost**.

244131 GNT in Golem contract ~ $54333:
https://etherscan.io/token/Golem?a=0xa74476443119a942de498590fe1f2454d7d4ac0d

200 REP in Augur contract ~ $3292:
https://etherscan.io/token/REP?a=0x48c80f1f4d53d5951e5d5438b54cba84f29f32a5

777 DGD in Digix DAO contract ~ $7500:
https://etherscan.io/token/0xe0b7927c4af23765cb51314a0e0521a9645f0e2a?a=0xe0b7927c4af23765cb51314a0e0521a9645f0e2a

10150  1ST in FirstBlood contract ~ $3466:
https://etherscan.io/token/FirstBlood?a=0xaf30d2a7e90d7dc361c8c4585e9bb7d2f6f15bc7
  
30 MLN in Melonport contract ~ $1197:
https://etherscan.io/token/Melon?a=0xBEB9eF514a379B997e0798FDcC901Ee474B6D9A1+

# Unit Test

## Unit testing scenario's Basic23Token

### Basic23Token #1 should return the correct totalSupply after construction
* [X] totalSupply = 100

**Console Output:**
```
Contract: Basic23Token
Basic23Token #1. BEGIN==========================================================
What is the totalSupply of the created Token?
The totalSupply of the created Token should equal to 100
What is the balance of MAIN_ACCOUNT?
The balance of the MAIN_ACCOUNT  should be 100
    ✓ Basic23Token #1 should return the correct totalSupply after construction (139ms)
```

### Basic23Token #2 should return correct balances after transfer
* [X] Bob (main account) has 100 tokens
* [X] Bob transer 100 tokens to Alice
* [X] Bob has 0 tokens left
* [X] Alice has received 100 tokens

**Console Output:**
```
Basic23Token #2. BEGIN==========================================================
MAIN_ACCOUNT should be able to transfer 100 token to RECEIVING_ACCOUNT while MAIN_ACCOUNT has 100 token
mainAccountBalanceBeforeTransfer =100
ReceivingAccountBalanceBeforeTransfer =0
Try to transfer 100 from MAIN_ACCOUNT to RECEIVING_ACCOUNT
    ✓ Basic23Token #2 should return correct balances after transfer (217ms)
```

### Basic23Token #3 should throw an error when trying to transfer less than 0
* [X] Bob (main account) has 100 tokens
* [X] Alice have 0 tokens
* [X] Bob try to transer -2 tokens to Alice
* [X] Throw an error when trying to transfer less than 0 
* [X] Bob still have  100 tokens left
* [X] Alice still have 0 tokens

**Console Output:**
```
Basic23Token #3 BEGIN==========================================================
MAIN_ACCOUNT tries to transfer -2 token to RECEIVING_ACCOUNT while TRANSFER_AMOUNT is smaller dan 0
mainAccountBalanceBeforeTransfer=100
ReceivingAccountBalanceBeforeTransfer=0
Try to transfer -2 from MAIN_ACCOUNT to RECEIVING_ACCOUNT
mainAccountBalanceAfterTransfer =100
ReceivingAccountBalanceAfterTransfer =0
    ✓ Basic23Token #3 should throw an error when trying to transfer less than 0 (179ms)
```

### Basic23Token #4 should throw an error when trying to transfer more than balance
* [X] Bob (main account) has 100 tokens
* [X] Alice still have 0 tokens
* [X] Bob try to transer 101 tokens to Alice
* [X] Throw an error when trying to transfer more than account balance 
* [X] Bob still have  100 tokens left
* [X] Alice still have 0 tokens


**Console Output:**
```
Basic23Token #4 BEGIN==========================================================
MAIN_ACCOUNT tries to transfer 101 token to RECEIVING_ACCOUNT while TRANSFER_AMOUNT is greater than than balance of MAIN_ACCOUNT
mainAccountBalanceBeforeTransfer=100
ReceivingAccountBalanceBeforeTransfer=0
Try to transfer 101 from MAIN_ACCOUNT to RECEIVING_ACCOUNT
mainAccountBalanceAfterTransfer =100
ReceivingAccountBalanceAfterTransfer =0
    ✓ Basic23Token #4 should throw an error when trying to transfer more than balance (205ms)
```


### Basic23Token #5 should throw an error when trying to transfer without any tokens
* [X] Bob (main account) has 0 tokens
* [X] Alice still have 0 tokens
* [X] Bob try to transer 100 tokens to Alice
* [X] Throw an error when trying to transfer more than account balance 
* [X] Bob still have  0 tokens left
* [X] Alice still have 0 tokens


**Console Output:**
```
Basic23Token #5 BEGIN==========================================================
MAIN_ACCOUNT tries to transfer 100 token to RECEIVING_ACCOUNT while MAIN_ACCOUNT does not have any tokens
mainAccountBalanceBeforeTransfer=0
ReceivingAccountBalanceBeforeTransfer=0
Try to transfer 100 from MAIN_ACCOUNT to RECEIVING_ACCOUNT
mainAccountBalanceAfterTransfer =0
ReceivingAccountBalanceAfterTransfer =0
    ✓ Basic23Token #5 should throw an error when trying to transfer without any tokens (220ms)
```


### Basic23Token #6 should throw an error when trying to transfer to 0x0
* [X] Bob (main account) has 100 tokens
* [X] Bob try to transer 100 tokens to 0x0
* [X] Throw an error when trying to transfer to 0x0
* [X] Bob still have  100 tokens left

**Console Output:**
```
Basic23Token #6 BEGIN==========================================================
mainAccountBalanceBeforeTransfer=100
Try to transfer 100 from MAIN_ACCOUNT to 0x0
mainAccountBalanceAfterTransfer =100
    ✓ "Basic23Token #6 should throw an error when trying to transfer to 0x0 (128ms)
```

 ## Unit testing scenario's Standard23Token   

 ### Standard23Token #1 should return the correct totalSupply after construction
* [X] totalSupply = 100


**Console Output:**
```
Standard23Token #1 BEGIN==========================================================
What is the totalSupply of the created Token?
The totalSupply of the created Token should equal to 100
What is the balance of MAIN_ACCOUNT?
The balance of the MAIN_ACCOUNT  should be 100
    ✓ Standard23Token #1 should return the correct totalSupply after construction (114ms)
```

### Standard23Token #2 should return the correct allowance amount after approval
* [X] Bob (main account) has 100 tokens
* [X] Alice (spender) still have 0 tokens
* [X] Bob gives approval to Alice to be able to  transfer 40
* [X] Allowance of Alice must be 40
* [X] Bob still have  100 tokens left
* [X] Alice still have 0 tokens


**Console Output:**
```
Standard23Token #2 BEGIN==========================================================
SPENDER_ACCOUNT allowed to transfer 40 because SPENDER_ACCOUNT has 40 approved amount
mainAccountBalanceBeforeTransfer=100
spenderAccountBalanceBeforeTransfer=0
APPROVE_AMOUNT = 40
Allowance = 40  of SPENDER_ACCOUNT
mainAccountBalanceAfterTransfer = 100
spenderAccountBalanceAfterTransfer = 0
    ✓ Standard23Token #2 should return the correct allowance amount after approval (218ms)
```

### Standard23Token #3 should return correct balances after transfering from another account
* [X] Bob (main account) has 100 tokens
* [X] Alice (spender) have 0 tokens
* [X] Chris (receiver) have 0 tokens
* [X] Bob gives approval to Alice to be able to transferFrom 40
* [X] Allowance of Alice must be 40
* [X] Alice transfer 40 tokens to Chris
* [X] Bob will have 60 tokens left
* [X] Chris will have 40 tokens left
* [X] Alice still have 0 tokens

**Console Output:**
```
Standard23Token #3 BEGIN==========================================================
mainAccountBalanceBeforeTransfer=100
ReceivingAccountBalanceBeforeTransfer=0
spenderAccountBalanceBeforeTransfer=0
APPROVE_AMOUNT = 40
Allowance = 40  of SPENDER_ACCOUNT
mainAccountBalanceAfterTransfer =60
ReceivingAccountBalanceAfterTransfer = 40
spenderAccountBalanceAfterTransfer = 0
    ✓ Standard23Token #3 should return correct balances after transfering from another account (341ms)
```

### Standard23Token #4 should throw an error when trying to transfer more than allowed
* [X] Bob (main account) has 99 tokens
* [X] Alice (spender) have 0 tokens
* [X] Chris (receiver) have 0 tokens
* [X] Bob gives approval to Alice to be able to transferFrom 99
* [X] Alice transfer 100 tokens to Chris
* [X] Throw an error when trying to transferFrom more than allowed
* [X] Bob still have 99 tokens left
* [X] Chris will have 0 tokens left
* [X] Alice still have 0 tokens

**Console Output:**
```
Standard23Token #4 BEGIN==========================================================
mainAccountBalanceBeforeTransfer=99
ReceivingAccountBalanceBeforeTransfer=0
spenderAccountBalanceBeforeTransfer=0
APPROVE_AMOUNT 99
Try to TransferFrom 100 MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT
mainAccountBalanceAfterTransfer =99
ReceivingAccountBalanceAfterTransfer =0
spenderAccountBalanceAfterTransfer =0
    ✓ Standard23Token #4 should throw an error when trying to transfer more than allowed (274ms)
```


### Standard23Token #5 should throw an error when trying to transfer when not allowed
* [X] Bob (main account) has 100 tokens
* [X] Alice (spender) have 0 tokens
* [X] Chris (receiver) have 0 tokens
* [X] Alice transfer 100 tokens to Chris without approval
* [X] Throw an error when trying to transferFrom with no allowance
* [X] Bob still have 99 tokens left
* [X] Chris will have 0 tokens left
* [X] Alice still have 0 tokens

**Console Output:**
```
Standard23Token #5 BEGIN==========================================================
mainAccountBalanceBeforeTransfer=100
ReceivingAccountBalanceBeforeTransfer=0
spenderAccountBalanceBeforeTransfer=0
Try to TransferFrom 100 MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT
mainAccountBalanceAfterTransfer =100
ReceivingAccountBalanceAfterTransfer =0
spenderAccountBalanceAfterTransfer =0
    ✓ Standard23Token #5 should throw an error when trying to transfer when not allowed (240ms)
```


### Standard23Token #6 should throw an error when trying to transfer less than 0
* [X] Bob (main account) has 100 tokens
* [X] Alice (spender) have 0 tokens
* [X] Chris (receiver) have 0 tokens
* [X] Bob gives approval to Alice to be able to transferFrom 100
* [X] Alice transfer -1 tokens to Chris
* [X] Throw an error when trying to transferFrom less than 0
* [X] Bob still have 100 tokens left
* [X] Chris will have 0 tokens left
* [X] Alice still have 0 tokens

**Console Output:**
```
Standard23Token #6 BEGIN==========================================================
mainAccountBalanceBeforeTransfer=100
ReceivingAccountBalanceBeforeTransfer=0
spenderAccountBalanceBeforeTransfer=0
APPROVE_AMOUNT 100
Try to TransferFrom -1 MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT
mainAccountBalanceAfterTransfer =100
ReceivingAccountBalanceAfterTransfer =0
spenderAccountBalanceAfterTransfer =0
    ✓ Standard23Token #6 should throw an error when trying to transfer less than 0 (297ms)
```


### Standard23Token #7 should throw an error when trying to transfer more than supply
* [X] Bob (main account) has 100 tokens
* [X] Alice (spender) have 0 tokens
* [X] Chris (receiver) have 0 tokens
* [X] Bob gives approval to Alice to be able to  transfer 101
* [X] Alice transfer 101 tokens to Chris
* [X] Throw an error when trying to transferFrom more than supply
* [X] Bob still have 100 tokens left
* [X] Chris will have 0 tokens left
* [X] Alice still have 0 tokens

**Console Output:**
```
Standard23Token #7 BEGIN==========================================================
mainAccountBalanceBeforeTransfer=100
ReceivingAccountBalanceBeforeTransfer=0
spenderAccountBalanceBeforeTransfer=0
APPROVE_AMOUNT 101
Try to TransferFrom 101 MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT
mainAccountBalanceAfterTransfer =100
ReceivingAccountBalanceAfterTransfer =0
spenderAccountBalanceAfterTransfer =0
    ✓ Standard23Token #7 should throw an error when trying to transfer more than supply (312ms)
```

### Standard23Token #8 should throw an error when trying to transferFrom to 0x0
* [X] Bob (main account) has 100 tokens
* [X] Alice (spender) have 0 tokens
* [X] Bob gives approval to Alice to be able to  transferFrom 100
* [X] Alice transfer 100 tokens to 0x0
* [X] Throw an error when trying to transferFrom to 0x0 
* [X] Bob still have 100 tokens left
* [X] Alice still have 0 tokens

**Console Output:**
```
Standard23Token #8 BEGIN==========================================================
mainAccountBalanceBeforeTransfer=100
spenderAccountBalanceBeforeTransfer=0
APPROVE_AMOUNT = 40
mainAccountBalanceAfterTransfer =100
spenderAccountBalanceAfterTransfer =0
    ✓ Standard23Token #8 should throw an error when trying to transferFrom to 0x0 (213ms)
```

### Standard23Token #9 Approval should start with zero and should increase by 50 then decrease by 10
* [X] Pre approved amount should be 0
* [X] Increse approval with 50
* [X] Post increse allowance should be 50
* [X] Increse approval by 10
* [X] Post Decrease allowance should be 40

**Console Output:**
```
Standard23Token #9 validating allowance updates to spender
preApproved = 0
Increse approval to  50
PostIncrese allowance = 50
Increse approval by 10
postDecrease allowance = 40
      ✓ Approval should start with zero and should increase by 50 then decrease by 10 (197ms)
```