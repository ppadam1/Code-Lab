const crypto = require('crypto');
const DEFAULT_ALGO_SHA256 = 'SHA256';
const DEFAULT_ENCODING_HEX = 'hex';

const HasHash = (
    keys,
    options = {
        algorithm: DEFAULT_ALGO_SHA256,
        encoding: DEFAULT_ENCODING_HEX
    }) => ({
    calculateHash() {
        const data = keys.map(f => this[f]).join('');
        return crypto.createHash(options.algorithm).update(data).digest(options.encoding)
    }
});

module.exports = HasHash;