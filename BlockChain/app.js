'use strict';

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

const HasHash = keys => ({
    calculateHash() {
        const data = keys.map(f => this[f]).join('');
        let hash = 0, i = 0;
        while (i < data.length) {
            hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
        }
        return hash ** 2;
    }
});

Object.assign(
    Transaction.prototype,
    HasHash(['timestamp', 'sender', 'recipient', 'funds']),
    HasSignature(['sender', 'recipient', 'funds']),
    HasValidation()
)

const tx = new Transaction('luis@tjoj.com', 'luke@tjoj.com', 10);
console.log(tx);