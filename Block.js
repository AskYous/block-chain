import Crypto from "crypto-js";
/**
 * Represents a block in a block chain
 */
export class Block {
    /**
     * @param {number} index Represents the location of this block in the entire blockchain
     * @param {Date} createdAt The timestamp this block was created at
     * @param {any} data The data this block is holding
     * @param {string?} previousHash The hashcode of the previous block
     */
    constructor(index, createdAt, data, previousHash = null) {
        this.index = index;
        this.createdAt = createdAt;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return Crypto.SHA256(
            this.index.toString()
            + this.createdAt
            + JSON.stringify(this.data)
            + this.previousHash
            + this.nonce.toString()
        ).toString();
    }

    isValid() {
        const expected = this.calculateHash();
        const actual = this.hash;
        return expected === actual;
    }

    mineBlock(difficulty) {
        /** @param {string} hash */
        function hashIsValid(hash) {
            const expected = Array(difficulty).join("0");
            const actual = hash
        }
    }
}
