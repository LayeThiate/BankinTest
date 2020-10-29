class User {
    constructor(login, password, clientId, clientSecret) {
        this.login = login;
        this.password = password;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
}

module.exports = User;