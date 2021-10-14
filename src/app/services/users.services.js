/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';

const User = require('../models/users.models');

exports.find = async (query) => {
    const users = await User.find(query).lean().exec();
    return users;
};

exports.insert = async (reqName, reqEmail, reqPass) => {
    const user = new User({ 
        name: reqName,
        email: reqEmail,
        password: reqPass,
        role: 'user',
    });
    const newUser = user.save();
    return newUser;
};

exports.insertAdmin = async (id, reqName, reqEmail, reqPass) => {
    const search = await User.findById(id);
    const role = search.role;
    if (role === 'admin') {
        const user = new User({ 
            name: reqName,
            email: reqEmail,
            password: reqPass,
            role: 'admin',
        });
        const newUser = user.save();
        return newUser;
    }
};

exports.authenticate = async ({ email, password }) => {
    const user = await User.findOne({ email });
    const pass = user.password;
    if (user && pass === password) {
        const id = user.id;
        const token = jwt.sign({ id }, `${process.env.SECRET}`, { expiresIn: '7d' });
        return token;
    }
};
