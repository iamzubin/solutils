//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract Eip712Verify {

    function verifyHash(
        string memory _inputString,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) external view{


        bytes32 eip712DomainHash = keccak256(
            abi.encode(keccak256('EIP712Domain(string name,string version)'), keccak256(bytes('EIP712Verifer')), keccak256(bytes('1')))
        );

        bytes32 hashStruct = keccak256(
            abi.encode(
                keccak256('set(string inputString,address userAddr)'),
                keccak256(bytes(_inputString)),
                msg.sender
            )
        );

        bytes32 hash = keccak256(abi.encodePacked('\x19\x01', eip712DomainHash, hashStruct));
        address signer = ecrecover(hash, _v, _r, _s);
        require(signer == msg.sender, 'verifyHash: invalid signature');
    }
}