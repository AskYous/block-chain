const SHA256 = require("crypto-js/sha256");

/**
 * Represents a block in a block chain
 */

export class Block {
    /**
     * @param {Date} createdAt The timestamp this block was created at
     * @param {any} data The data this block is holding
     * @param {string?} previousHash The hashcode of the previous block
     */
    constructor(createdAt, data, previousHash = null) {
        /** @type {number?} Represents the location of this block in the entire blockchain */
        this.index = null;
        this.createdAt = createdAt;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(
            this.index.toString()
            + this.createdAt
            + JSON.stringify(this.data)
            + this.previousHash
        ).toString();
    }
}
