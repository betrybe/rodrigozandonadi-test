const User = require('../models/users.models');

exports.find = async (query) => {
    const users = await User.find(query).lean().exec();
    return users;
};

exports.findOne = async (query) => {
    const user = await User.find({ query }).lean().exec();
    return user;
};

exports.insert = async (reqName, reqEmail, reqPass) => {
    const users = new User({ 
        name: reqName,
        email: reqEmail,
        password: reqPass,
        role: 'user',
    });
    const newUser = users.save();
    return newUser;
};
