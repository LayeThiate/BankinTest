class AccountTransaction {
    constructor(acc_number, amount, transactions) {
        this.acc_number = acc_number;
        this.amount = amount;
        this.transactions = transactions;
    }
}

class Transaction {
    constructor(label, amount, currency) {
        this.label = label;
        this.amount = amount;
        this.currency = currency;
    }
}

module.exports = {
    accountTransaction: AccountTransaction,
    transaction: Transaction
};