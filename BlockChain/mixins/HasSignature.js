const crypto = require('crypto');
const DEFAULT_SIGN_ALGO = 'SHA256';
const DEFAULT_ENCODING_HEX = 'hex';

const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'sect239k1'
});

const HasSignature = (
    keys
) => ({
    generateSignature() {
        const data = keys.map(f => this[f]).join('');
        const sign = crypto.createSign(DEFAULT_SIGN_ALGO);
        sign.write(data);
        const signature = sign.sign(privateKey, DEFAULT_ENCODING_HEX);
        return signature;
    },
    verifySignature(signature) {
        const data = keys.map(f => this[f]).join('');
        const verify = crypto.createVerify(DEFAULT_SIGN_ALGO);
        verify.write(data);
        verify.end();
        return verify.verify(publicKey, signature, DEFAULT_ENCODING_HEX);
    }
});

module.exports = HasSignature;