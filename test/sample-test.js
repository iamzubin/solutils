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
