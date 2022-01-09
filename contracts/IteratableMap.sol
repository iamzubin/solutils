//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract IteratableMap {
    mapping (address => uint) public balances;
    address[] public addressList;

    function addBalance(address _address, uint _amount) public {
        balances[_address] += _amount;
        addressList.push(_address);
    }

    function getBalance(address _address) public view returns (uint) {
        return balances[_address];
    }

    function getAddressList() public view returns (address[] memory) {
        return addressList;
    }

    function getBalanceList() public view returns (uint[] memory) {
        uint[] memory balanceList = new uint[](addressList.length);
        for (uint i = 0; i < addressList.length; i++) {
            balanceList[i] = balances[addressList[i]];
        }
        return balanceList;
    }
}