pragma solidity ^0.4.15;

import './interface/ERC23Basic.sol';

/**
 * @title SafeERC20
 * @dev Wrappers around ERC23 operations that throw on failure.
 * To use this library you can add a `using SafeERC23 for ERC23;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 *
 * Created by IAM <DEV> (Elky Bachtiar) 
 * https://www.iamdeveloper.io
 *
 */
library SafeERC23 {
    function safeTransfer(ERC23Basic token, address _to, uint256 _value) internal {
        assert(token.transfer(_to, _value));
    }
}
