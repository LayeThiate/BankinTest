const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userController = require('./controller/userController');
const User = require('./models/user');
const accountTransaction = require('./models/accountTransaction');

app.use(bodyParser.json());

const AccountTransaction = accountTransaction.accountTransaction;
const Transaction = accountTransaction.transaction;

const data = {
    user: 'BankinUser',
    password: '12345678'
};

var auth = 'Basic ' + Buffer.from('BankinClientId:secret').toString('base64');

const user = new User('BankinUser', '12345678', 'BankinClientId', 'secret');
userController.login(user, (res, error) => {
    if (!error) {
        var refresh_token = res.data.refresh_token;
        console.log("REFRESH TOKEN      : " + refresh_token);
        userController.token(refresh_token, (res, error) => {
            if (!error) {
                var access_token = res.data.access_token;
                console.log("ACCESS TOKEN       :  " + access_token);
                
                userController.accounts(access_token, 1, (res, error) => {
                    if (!error) {
                        var accounts = parseAccount(res.data.account, access_token);
                    }
                });
            }
        })
    }
});

function parseAccount(account, access_token) {
    var accounts = new Array();
    for (let i = 0; i < account.length; i++) {

        userController.transactions(access_token, account[i].acc_number, '1', (res, error, callback) => {
            if (!error) {

                var acc_number = account[i].acc_number;
                var amount = account[i].amount;
                var transactions = parseTransaction(res.data.transactions);
                var parsedAccount = new AccountTransaction(acc_number, amount, transactions);
                console.log("AccountTransaction", parsedAccount);
                accounts.push(parsedAccount);
            } else {
                console.log("Error : " + error);
            }
        });
    }
    return accounts;
}

function parseTransaction(transactions) {
    var transactionsArray = new Array();
    for (let i = 0; i < transactions.length; i++) {
        var transaction = transactions[i];
        var parsedTransaction = new Transaction(transaction.label, transaction.amount, transaction.currency);
        transactionsArray.push(parsedTransaction);
    }

    return transactionsArray;
}