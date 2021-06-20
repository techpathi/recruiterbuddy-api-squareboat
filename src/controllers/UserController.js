const User = require('../models/User.model');
const generateToken = require('../utilities/auth/tokenGenerator');

exports.create = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: true, message: 'Invalid data' });
    }
    else {
        const newUser = new User(req.body);
        User.create(newUser, function (err, user) {
            if (err) {
                let message = 'Something is wrong in our server room!';
                if (err.code === 'ER_DUP_ENTRY') message = 'User already exists';
                console.log('Reg message:', message);
                return res.status(409).json({ error: true, message: message });
            }
            else {
                res.status(200).json({ error: false, message: "User signed up successfully!" });
            }
        });
    }
};

exports.find = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: true, message: 'Invalid data' });
    }
    else {
        const { username, password } = req.body;
        User.find(username, password, function (err, user) {
            if (err) {
                return res.status(404).send({ error: true, message: 'No users found' });
            }
            else if (user) {
                const token = generateToken(user.email);
                const role = user.role;
                return res.status(200).json({ error: false, message: "User signed in successfully!", token: token, username: username, role: role });
            }
        });
    }
}
