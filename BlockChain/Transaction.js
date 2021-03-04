'use strict';

const HasHash = require('/home/praneesh/Projects/code-lab/BlockChain/mixins/HasHash.js');
const HasSignature = require('/home/praneesh/Projects/code-lab/BlockChain/mixins/HasSignature.js');

class Transaction {
    transactionId = '';
    timestamp = Date.now();
    feePercent = 0.6;

    constructor(sender, recipient, funds = 0.0, description = 'Generic') {
        this.sender = sender;
        this.recipient = recipient;
        this.funds = Number(funds);
        this.description = description;
        this.transactionId = this.calculateHash();
    }

    displayTransaction() {
        return `Transaction ${this.description} from ${this.sender} for $${this.recipient} for ${this.funds}`;
    }

    get netTotal() {
        return Transaction.precisionRound(this.funds * this.feePercent, 2);
    }

    static precisionRound(number, precision) {
        const factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }
}

Object.assign(
    Transaction.prototype,
    HasHash(['timestamp', 'sender', 'recipient', 'funds']),
    HasSignature(['sender', 'recipient', 'funds']),
    // HasValidation()
)

const tx = new Transaction('praneeshpadam@gmail.com', 'mail.praneesh', 100.223);
console.log(tx);