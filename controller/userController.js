const axios = require('axios');

const hostname = 'http://localhost';
const hostport = 3000;
const host = `${hostname}:${hostport}`;

exports.login = (user, callback) => {

    const { login, password, clientId, clientSecret } = user;

    let auth = 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    let header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        }
    }

    let data = {
        user: login,
        password: password
    };

    axios.post(`${host}/login`, data, header)
        .then(res => callback(res, null))
        .catch(error => callback(null, error));
};

exports.token = (refresh_token, callback) => {
    let header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    let data = `grant_type=refresh_token&refresh_token=${refresh_token}`;
    axios.post(`${host}/token`, data, header)
        .then(res => callback(res, null))
        .catch(error => callback(null, error));
};

exports.accounts = (access_token, page, callback) => {
    let header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    };
    axios.get(`${host}/accounts?page=${page}`, header)
        .then(res => { console.log("RESPONSE   : " + JSON.stringify(res.data)); callback(res, null) })
        .catch(error => callback(null, error));
};

const fetchAccounts = (page, header, callback) => {
    axios.get(`${host}/accounts?page=${page}`, header)
        .then(res => { console.log("RESPONSE   : " + JSON.stringify(res.data)); callback(res, null) })
        .catch(error => callback(null, error));
}

exports.transactions = (access_token, id, page, callback) => {
    let header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    };

    axios.get(`${host}/accounts/${id}/transactions`, header)
        .then(res => callback(res, null))
        .catch(error => callback(null, error));
};