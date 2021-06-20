const dbConnection = require('../db/connection');

var User = function (user) {
    this.fullName = user.fullName,
        this.username = user.username,
        this.password = user.password,
        this.role = user.role ? user.role : 'J',
        this.active = 1,
        this.createdAt = new Date(),
        this.updatedAt = new Date()
}

User.create = function (newUser, result) {
    dbConnection.query("INSERT INTO users set ?", newUser, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};

User.find = function (username, password, result) {
    dbConnection.query("SELECT username,role from users where username = ? and password = ?", [username, password], function (err, res) {

        console.log(res);
        var isNoResults = null;
        if (res) {
            isNoResults = res.toString() == [];
            if (!isNoResults) {
                result(null, res[0]);
            }
        }
        if (err || isNoResults) {
            err = isNoResults ? new Error('No users found') : err;
            result(err, null);
        }
        // else {
        //     result(null, res[0]);
        // }
    });
}

module.exports = User;

