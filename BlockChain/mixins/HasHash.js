const crypto = require('crypto');
const DEFAULT_ALGO_SHA256 = 'SHA256';
const DEFAULT_ENCODING_HEX = 'hex';

const HasHash = keys => ({
    calculateHash() {
        const data = keys.map(f => this[f]).join('');
        return crypto.createHash(DEFAULT_ALGO_SHA256).update(data).digest(DEFAULT_ENCODING_HEX)
    }
});

module.exports = HasHash;