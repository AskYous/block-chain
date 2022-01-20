import { Block } from "./Block";


export class Blockchain {
    /**
     * @param {Block} genesisBlock
     */
    constructor(genesisBlock) {
        /** @type {Block[]} The chain */
        this.chain = [genesisBlock];
    }
    getLatestBlock() {
        return this.chain[-1]; // test this
    }
    /** @param {Block} block */
    addBlock(block) {
        block.previousHash = this.getLatestBlock().hash;
        block.hash = block.calculateHash();
        this.chain.push(block);
        block.index = this.chain.length - 1;
    }
}
