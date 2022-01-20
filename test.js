import assert from "assert";
import { Block } from "./Block";
import { Blockchain } from "./Blockchain";

const genesisBlock = new Block(0, new Date(), "I am the first block in the block chain");

describe("Block chain", () => {
    it("Should create a new block chain", () => new Blockchain(genesisBlock));
    it("Should have the first block be the genesis block", () => {
        const bc = new Blockchain(genesisBlock);
        assert.strictEqual(bc.chain[0], genesisBlock);
    });
    it("Should add blocks", () => {

    })
})