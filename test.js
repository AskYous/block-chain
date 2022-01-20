import assert from "assert";
import { Block } from "./Block.js";
import { Blockchain } from "./Blockchain.js";

let sampleBlocks = initialSampleBlocks();
let genesisBlock = sampleBlocks[0];

function initialSampleBlocks() {
    return [
        new Block(0, new Date(), "I am the first block in the block chain"),
        new Block(1, new Date(), "I am the second block."),
        new Block(2, new Date(), "I am the third block."),
    ];
}

beforeEach(() => {
    sampleBlocks = initialSampleBlocks();
    genesisBlock = sampleBlocks[0];
});

describe("Block chain", () => {
    it("Should create a new block chain", () => new Blockchain());
    it("Should add blocks", () => {
        const bc = new Blockchain();
        const blockToAdd = sampleBlocks[1];
        bc.addBlock(blockToAdd);
        assert.equal(bc.getLatestBlock(), blockToAdd);
    });
    it("Should have each block reference the previous block's hash", () => {
        const bc = new Blockchain();
        for (const block of sampleBlocks) bc.addBlock(block);
        assert(bc.isValid());
    });
    it("Should invalidate a block that changed its data", () => {
        genesisBlock.data = "CHANGED DATA";
        assert(!genesisBlock.isValid());
    });
    it("Should not allow a block to re-calculate its hash", () => {
        const bc = new Blockchain();
        for (const b of sampleBlocks) bc.addBlock(b);
        const blockToTamper = sampleBlocks[1];
        blockToTamper.data = "CHANGED DATA";
        blockToTamper.hash = blockToTamper.calculateHash();
        assert(!bc.isValid());
    });
    it("Should not allow blocks previous hash to be realculated", () => {
        const bc = new Blockchain();
        for (const b of sampleBlocks) bc.addBlock(b);

        // edit blocks data and hash
        const blockToTamper = sampleBlocks[1];
        blockToTamper.data = "CHANGED DATA";
        blockToTamper.hash = blockToTamper.calculateHash();

        // tamper next blocks previous hash
        const nextBlock = sampleBlocks[2];
        nextBlock.previousHash = blockToTamper.hash;
        nextBlock.hash = nextBlock.calculateHash();

        bc.exportToFile();
        assert(!bc.isValid());
    })
});