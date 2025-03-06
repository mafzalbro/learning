// controllers/userController.js
const User = require('../models/user');

let users = [];

const addUser = (req, res) => {
    const { id, name } = req.body;
    const user = new User(id, name);
    users.push(user);
    req.io.emit('userAdded', { id: user.id, message: 'New user added' });
    res.status(201).json({ message: 'User added successfully', user, users });
};

const getUsers = (req, res) => {
    res.json(users);
};


module.exports = { addUser, getUsers };
