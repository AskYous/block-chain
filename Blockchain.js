import fs from 'fs';
import { Block } from "./Block.js";

export class Blockchain {
    constructor() {
        /** @type {Block[]} The chain */
        this.chain = [];
        this.difficulty = 4;
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1]; // test this
    }
    /** @param {Block} block */
    addBlock(block) {
        block.previousHash = this.getLatestBlock()?.hash;
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        block.index = this.chain.length - 1;
    }
    exportToFile() {
        const output = JSON.stringify(this.chain, null, 4);
        const file = "block-chain-output.json";

        fs.writeFileSync(file, output);
    }
    isValid() {
        for (let i = 1; i < this.chain.length; i++) {

            const current = this.chain[i];
            const previous = this.chain[i - 1];
            const expected = this.chain[i].previousHash;
            const actual = previous.calculateHash();

            if (!current.isValid()) return false;
            if (actual !== expected) return false;
        }
        return true;
    }
}
