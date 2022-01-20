import fs from 'fs';
import { Block } from "./Block.js";

export class Blockchain {
    /**
     * @param {Block} genesisBlock
     */
    constructor(genesisBlock) {
        /** @type {Block[]} The chain */
        this.chain = [genesisBlock];
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1]; // test this
    }
    /** @param {Block} block */
    addBlock(block) {
        block.previousHash = this.getLatestBlock().hash;
        block.hash = block.calculateHash();
        this.chain.push(block);
        block.index = this.chain.length - 1;
    }
    exportToFile() {
        const output = JSON.stringify(this.chain, null, 4);
        const file = "block-chain-output.json";

        fs.writeFileSync(file, output);
    }
}
