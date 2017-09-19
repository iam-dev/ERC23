# Unit Testing

## Unit testing scenario's Basic23Token

### Basic23Token #1 should return the correct totalSupply after construction
* [X] totalSupply should be equal to INITAL_SUPPLY (100 tokens)
* [X] Owner (MAIN_ACCOUNT) should owned all the tokens and this should be equal to INITAL_SUPPLY (100 tokens)

**Console Output:**
```

Basic23Token #1. BEGIN==========================================================
The totalSupply of the created Token should equal to INITAL_SUPPLY = 100
What is the balance of MAIN_ACCOUNT?
The balance of the MAIN_ACCOUNT  should be equal to INITAL_SUPPLY = 100
    ✓ Basic23Token #1 should return the correct totalSupply after construction (63ms)

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
mainAccountBalanceBeforeTransfer = 100 should equal to INITAL_SUPPLY = 100
ReceivingAccountBalanceBeforeTransfer = 0 should equal to 0
Try to transfer 100 from MAIN_ACCOUNT to RECEIVING_ACCOUNT
mainAccountBalanceAfterTransfer = 0 should equal to INITAL_SUPPLY-TRANSFER_AMOUNT = 0
ReceivingAccountBalanceAfterTransfer should equal to 100
    ✓ Basic23Token #2 should return correct balances after transfer (199ms)
    
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
mainAccountBalanceBeforeTransfer = 100  should equal to INITAL_SUPPLY =100
ReceivingAccountBalanceBeforeTransfer = 0  should equal to 0
Try to transfer -2 from MAIN_ACCOUNT to RECEIVING_ACCOUNT
mainAccountBalanceAfterTransfer = 100  should equal to INITAL_SUPPLY = 100
ReceivingAccountBalanceAfterTransfer = 0  should equal to 0
    ✓ Basic23Token #3 should throw an error when trying to transfer less than 0 (152ms)

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
mainAccountBalanceBeforeTransfer = 100  should equal to INITAL_SUPPLY = 100
ReceivingAccountBalanceBeforeTransfer = 0  should equal to 0
Try to transfer 101 from MAIN_ACCOUNT to RECEIVING_ACCOUNT
mainAccountBalanceAfterTransfer = 100  should equal to INITAL_SUPPLY = 100
ReceivingAccountBalanceAfterTransfer = 0  should equal to 0
    ✓ Basic23Token #4 should throw an error when trying to transfer more than balance (169ms)

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
mainAccountBalanceBeforeTransfer = 0  should equal to 0
ReceivingAccountBalanceBeforeTransfer = 0  should equal to 0
Try to transfer 100 from MAIN_ACCOUNT to RECEIVING_ACCOUNT
mainAccountBalanceAfterTransfer = 0  should equal to 0
ReceivingAccountBalanceAfterTransfer = 0 should equal to 0
    ✓ Basic23Token #5 should throw an error when trying to transfer without any tokens (190ms)

```


### Basic23Token #6 should throw an error when trying to transfer to 0x0
* [X] Bob (main account) has 100 tokens
* [X] Bob try to transer 100 tokens to 0x0
* [X] Throw an error when trying to transfer to 0x0
* [X] Bob still have  100 tokens left

**Console Output:**
```

Basic23Token #6 BEGIN==========================================================
mainAccountBalanceBeforeTransfer = 100  should equal to INITAL_SUPPLY = 100
Try to transfer 100 from MAIN_ACCOUNT to 0x0
mainAccountBalanceAfterTransfer = 100  should equal to INITAL_SUPPLY100
    ✓ "Basic23Token #6 should throw an error when trying to transfer to 0x0 (101ms)

```

 ## Unit testing scenario's Standard23Token   

 ### Standard23Token #1 should return the correct totalSupply after construction
* [X] totalSupply should be equal to INITAL_SUPPLY (100 tokens)
* [X] Owner (MAIN_ACCOUNT) should owned all the tokens and this should be equal to INITAL_SUPPLY (100 tokens)


**Console Output:**
```

Standard23Token #1 BEGIN==========================================================
The totalSupply of the created Token should equal to INITAL_SUPPLY = 100
What is the balance of MAIN_ACCOUNT?
The balance of the MAIN_ACCOUNT should equal to INITAL_SUPPLY = 100
    ✓ Standard23Token #1 should return the correct totalSupply after construction (57ms)

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
mainAccountBalanceBeforeTransfer = 100 should equal to INITAL_SUPPLY = 100
spenderAccountBalanceBeforeTransfer = 0 should equal to 0
APPROVE_AMOUNT = 40
Allowance = 40  of SPENDER_ACCOUNT
mainAccountBalanceAfterTransfer = 100 should equal to INITAL_SUPPLY = 100
spenderAccountBalanceAfterTransfer = 0 should equal to 0
    ✓ Standard23Token #2 should return the correct allowance amount after approval (202ms)

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
mainAccountBalanceBeforeTransfer = 100 should equal to INITAL_SUPPLY = 100
ReceivingAccountBalanceBeforeTransfer = 0 should equal to 0
spenderAccountBalanceBeforeTransfer = 0 should equal to 0
APPROVE_AMOUNT = 40
Allowance = 40  of SPENDER_ACCOUNT
mainAccountBalanceAfterTransfer = 60 should equal to NITAL_SUPPLY - APPROVE_AMOUNT = 60
ReceivingAccountBalanceAfterTransfer = 40 should equal to APPROVE_AMOUNT = 40
spenderAccountBalanceAfterTransfer = 0 should equal to 0
    ✓ Standard23Token #3 should return correct balances after transfering from another account (346ms)

```

### Standard23Token #4 should throw an error when trying to transfer more than allowed
* [X] Bob (main account) has 100 tokens
* [X] Alice (spender) have 0 tokens
* [X] Chris (receiver) have 0 tokens
* [X] Bob gives approval to Alice to be able to transferFrom 101
* [X] Alice transfer 100 tokens to Chris
* [X] Throw an error when trying to transferFrom more than allowed
* [X] Bob still have 100 tokens left
* [X] Chris will have 0 tokens left
* [X] Alice still have 0 tokens

**Console Output:**
```

Standard23Token #4 BEGIN==========================================================
mainAccountBalanceBeforeTransfer = 100 should equal to INITAL_SUPPLY= 100
ReceivingAccountBalanceBeforeTransfer = 0 should equal to 0
spenderAccountBalanceBeforeTransfer = 0 should equal to 0
APPROVE_AMOUNT 40
Try to TransferFrom 101 MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT
mainAccountBalanceAfterTransfer = 100 should equal to INITAL_SUPPLY = 100
ReceivingAccountBalanceAfterTransfer = 0 should equal to 0
spenderAccountBalanceAfterTransfer = 0 should equal to 0
    ✓ Standard23Token #4 should throw an error when trying to transfer more than allowed (229ms)

```


### Standard23Token #5 should throw an error when trying to transfer when not allowed
* [X] Bob (main account) has 100 tokens
* [X] Alice (spender) have 0 tokens
* [X] Chris (receiver) have 0 tokens
* [X] Alice transfer 100 tokens to Chris without approval
* [X] Throw an error when trying to transferFrom with no allowance
* [X] Bob still have 100 tokens left
* [X] Chris will have 0 tokens left
* [X] Alice still have 0 tokens

**Console Output:**
```

Standard23Token #5 BEGIN==========================================================
mainAccountBalanceBeforeTransfer = 100 should equal to INITAL_SUPPLY = 100
ReceivingAccountBalanceBeforeTransfer = 0should equal to 0
spenderAccountBalanceBeforeTransfer = 0 should equal to 0
Try to TransferFrom 100 MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT
mainAccountBalanceAfterTransfer = 100 should equal to INITAL_SUPPLY = 100
ReceivingAccountBalanceAfterTransfer = 0 should equal to 0
spenderAccountBalanceAfterTransfer = 0should equal to 0
    ✓ Standard23Token #5 should throw an error when trying to transfer when not allowed (201ms)

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
mainAccountBalanceBeforeTransfer = 100 should equal to INITAL_SUPPLY = 100
ReceivingAccountBalanceBeforeTransfer = 0 should equal to 0
spenderAccountBalanceBeforeTransfer = 0 should equal to 0
APPROVE_AMOUNT 100
Try to TransferFrom -1 MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT
mainAccountBalanceAfterTransfer = 100 should equal to INITAL_SUPPLY = 100
ReceivingAccountBalanceAfterTransfer should equal to 0
spenderAccountBalanceAfterTransfer should equal to 0
    ✓ Standard23Token #6 should throw an error when trying to transfer less than 0 (253ms)

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
mainAccountBalanceBeforeTransfer = 100 should equal to INITAL_SUPPLY = 100
ReceivingAccountBalanceBeforeTransfer = 0 should equal to 0
spenderAccountBalanceBeforeTransfer =0 should equal to 0
APPROVE_AMOUNT 101
Try to TransferFrom 101 MAIN_ACCOUNT to RECEIVING_ACCOUNT from SPENDER_ACCOUNT
mainAccountBalanceBeforeTransfer = 100 should equal to INITAL_SUPPLY = 100
ReceivingAccountBalanceAfterTransfer = 0 should equal to 0
spenderAccountBalanceAfterTransfer = 0 should equal to 0
    ✓ Standard23Token #7 should throw an error when trying to transfer more than supply (254ms)

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
mainAccountBalanceBeforeTransfer = 100 should equal to INITAL_SUPPLY = 100
spenderAccountBalanceBeforeTransfer = 0 should equal to 0
APPROVE_AMOUNT = 40
mainAccountBalanceBeforeTransfer = 100 should equal to INITAL_SUPPLY = 100
spenderAccountBalanceAfterTransfer = 0 should equal to 0
    ✓ Standard23Token #8 should throw an error when trying to transferFrom to 0x0 (234ms)

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
tokenAddress =  0x771b509274799fe37a502d6357f275238dcdfd66
preApproved = 0 should equal to 0
Increse approval to  50
PostIncrese allowance = 50 should equal to 50
Increse approval by 10
postDecrease allowance = 40 should equal to 40
      ✓ Approval should start with zero and should increase by 50 then decrease by 10 (219ms)
      
```

## Unit testing scenario's UpgradeableStandard23Token

### UpgradeableStandard23Token #1 should return the correct information after construction
* [X] Token inital supply should be equal to 100000000 * Math.pow(10,18)
* [X] Token totalSupply should be equal to 100000000 * Math.pow(10,18)
* [X] Token name should be equal to Dummy Token
* [X] oken symbol should be equal to DM
* [X] Token decimals should be equal to 18
* [X] Balance of Bob (main account) should be inital supply of 100000000 * Math.pow(10,18)
* [X] Balance of the contract address (this) should be equal to 0

**Console Output:**
```
UpgradeableStandard23Token #1 BEGIN==========================================================
What is the totalSupply of the created Token?
tokenAddress =  0xe3592472b9cb160418e6c0e614de4727644ebd73
The totalSupply of the created Token should equal to 1e+26
The Token name should be equal to Upgradeable Token
The Token symbol should be equal to UT
The Token decimals should be equal to 18
What is the balance of MAIN_ACCOUNT?
The balance of the MAIN_ACCOUNT  should be equal to 1e+26
What is the balance of token Address?
The balance of the tokenAddressBalance  should be equal to 0
    ✓ UpgradeableStandard23Token #1 should return the correct information after construction (256ms)
```

### UpgradeableStandard23Token #2 should return the correct information after changing information
* [X] Token name changed to "Change the Token name"
* [X] Token name should be equal to "Change the Token name"
* [X] Token symbol changed to "Change the Token symbol"
* [X] Token symbol should be equal to "Change the Token symbol"
* [X] Token decimals changed 0
* [X] Token decimals should be equal to 0


**Console Output:**
```
UpgradeableStandard23Token #2 BEGIN==========================================================
The Token name should be equal to Change the Token name
The Token symbol should be equal to Change the Token symbol
The Token decimals should be equal to 0
    ✓ UpgradeableStandard23Token #2 should return the correct information after changing information (241ms)
```


### UpgradeableStandard23Token #3 should return the correct information after changing totalSupply
* [X] Token totalSupply = 100
* [X] Token totalSupply add by 100
* [X] Token totalSupply should be changed to 200
* [X] Balance of the contract address (this) should be equal to 200
* [X] Token totalSupply sub by 150
* [X] Token totalSupply should be changed to 50
* [X] Balance of the contract address (this) should be equal to 50

**Console Output:**
```
UpgradeableStandard23Token #3 BEGIN==========================================================
mainAccountBalanceBeforeChangeSupply =  100
The totalSupply should be changed to 200
mainAccountBalanceAfterAddSupply =  200
The totalSupply should be changed to 50
mainAccountBalanceAfterSubSupply =  50
    ✓ UpgradeableStandard23Token #3 should return the correct information after changing totalSupply (302ms)
```

## Unit testing scenario's Mintable23Token


### Mintable23Token #1 should start with a totalSupply of 0
[X] Token totalSupply = 0

**Console Output:**
```

Mintable23Token #1 BEGIN==========================================================
    ✓ Mintable23Token #1 should start with a totalSupply of 0

```


### Mintable23Token #2 should return mintingFinished false after construction
[X] mintingFinished == false

**Console Output:**
```

Mintable23Token #2 BEGIN==========================================================
    ✓ Mintable23Token #2 should return mintingFinished false after construction

```

### Mintable23Token #3 should mint a given amount of tokens to a given address
[X] mainAccountBalanceBeforeMint should equal to 0
[X] mainAccountBalanceAfterMint = 100 should equal to INITAL_SUPPLY =100
[X] Token totalSupply after mint should be equal to  100


**Console Output:**
```

Mintable23Token #3 BEGIN==========================================================
mainAccountBalanceBeforeMint = 0 should equal to 0
mainAccountBalanceAfterMint = 100 should equal to INITAL_SUPPLY =100
totalSupplyAfterMint = 100 should equal to INITAL_SUPPLY =100
    ✓ Mintable23Token #3 should mint a given amount of tokens to a given address (119ms)

```


### Mintable23Token #4 should fail to mint after call to finishMinting
[X] mainAccountBalanceBeforeMint should equal to 0
[X] Finish minting
[X] Try to mint after finishMinting
[X] Token totalSupply after mint should be equal to  0

**Console Output:**
```

Mintable23Token #4 BEGIN==========================================================
mainAccountBalanceBeforeMint = 0 should equal to 0
mainAccountBalanceAfterMint = 0 should equal to 0
    ✓ Mintable23Token #4 should fail to mint after call to finishMinting (155ms)

```
