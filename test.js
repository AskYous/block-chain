import assert from "assert";
import { Block } from "./Block.js";
import { Blockchain } from "./Blockchain.js";

const sampleBlocks = [
    new Block(0, new Date(), "I am the first block in the block chain"),
    new Block(1, new Date(), "I am the second block."),
    new Block(2, new Date(), "I am the third block."),
];
const genesisBlock = sampleBlocks[0];

describe("Block chain", () => {
    it("Should create a new block chain", () => new Blockchain(genesisBlock));
    it("Should have the first block be the genesis block", () => {
        const bc = new Blockchain(genesisBlock);
        assert.equal(bc.chain[0], genesisBlock);
    });
    it("Should add blocks", () => {
        const bc = new Blockchain(genesisBlock);
        const blockToAdd = sampleBlocks[1];
        bc.addBlock(blockToAdd);
        assert.equal(bc.getLatestBlock(), blockToAdd);
        bc.exportToFile();
    });
});
