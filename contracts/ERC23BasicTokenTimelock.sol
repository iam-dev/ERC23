pragma solidity ^0.4.11;

import './Utils.sol';
import './interface/ERC23Basic.sol';
import "./SafeERC23.sol";

/**
 * @title ERC23BasicTokenTimelock
 * @dev TokenTimelock is a token holder contract that will allow a
 * beneficiary to extract the ERC23 basic tokens after a given release time
 *
 * Created by IAM <DEV> (Elky Bachtiar) 
 * https://www.iamdeveloper.io
 *
 */
contract ERC23BasicTokenTimelock is Utils {
    using SafeERC23 for ERC23Basic;

    // ERC23 basic token contract being held
    ERC23Basic token;

    // beneficiary of tokens after they are released
    address beneficiary;

    // timestamp when token release is enabled
    uint64 releaseTime;

    function TokenTimelock(ERC23Basic _token, address _beneficiary, uint64 _releaseTime) greaterThanNow(_releaseTime) {
        token = _token;
        beneficiary = _beneficiary;
        releaseTime = _releaseTime;
    }

    /**
    * @notice Transfers tokens held by timelock to beneficiary.
    * Deprecated: please use TokenTimelock#release instead.
    */
    function claim() {
        require(msg.sender == beneficiary);
        release();
    }

    /**
    * @notice Transfers tokens held by timelock to beneficiary.
    */
    function release() internal {
        require(now >= releaseTime);

        uint256 amount = token.balanceOf(this);
        require(amount > 0);

        token.safeTransfer(beneficiary, amount);
    }
}
