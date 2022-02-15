const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("IteratableMap", function () {
  it("Should add a new mapping", async function () {
    const IteratableMap = await ethers.getContractFactory("IteratableMap");
    const iteratableMap = await IteratableMap.deploy();
    await iteratableMap.deployed();

    const addMappingTx = await iteratableMap.addBalance(
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      100
    );
    await addMappingTx.wait();

    expect(
      await iteratableMap.getBalance(
        "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      )
    ).to.equal(100);

    // expect(
    //   await iteratableMap.getBalanceList()
    // ).to.equal([ethers.BigNumber.from(100)]);
  });
});

describe("EIP712", async function () {
  it("Should verify the signature", async function () {
    const EIP712Contract = await ethers.getContractFactory("Eip712Verify");
    const eip712Contract = await EIP712Contract.deploy();
    const addreses = await ethers.getSigners();

    const address = addreses[0];

    console.log("address", address.address);

    await eip712Contract.deployed();

    const domain = {
      name: "EIP712Verifier",
      version: "1",
    };

    const types = {
      set: [
        { name: "inputString", type: "string" },
        { name: "userAddr", type: "address" },
      ],
    };

    const value = {
      inputString: "string",
      userAddr: address.address,
    };

    // Create a SigningKey from the private key

    // Sign the typed data
    const signature = await address._signTypedData(domain, types, value);

    let sig = ethers.utils.splitSignature(signature);

    eip712Contract.verifyHash("string", sig.v, sig.r, sig.s);
  });
});
