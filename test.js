import assert from "assert";
import { Block } from "./Block.js";
import { Blockchain } from "./Blockchain.js";

let sampleBlocks = [
    new Block(0, new Date(), "I am the first block in the block chain"),
    new Block(1, new Date(), "I am the second block."),
    new Block(2, new Date(), "I am the third block."),
];
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
    });
    it("Should have each block reference the previous block's hash", () => {
        const bc = new Blockchain(sampleBlocks[0]);
        for (const block of sampleBlocks.slice(1)) bc.addBlock(block);
        assert(bc.isValid());
    });
    it("Should invalidate a block that changed its data", () => {
        genesisBlock.data = "CHANGED DATA";
        assert(!genesisBlock.isValid());
    });
    it("Should not allow a block to re-calculate its hash", () => {
        const bc = new Blockchain(genesisBlock);
        for (const b of sampleBlocks) bc.addBlock(b);
        const blockToTamper = sampleBlocks[1];
        blockToTamper.data = "CHANGED DATA";
        blockToTamper.hash = blockToTamper.calculateHash();
        assert(!bc.isValid());
    })
});