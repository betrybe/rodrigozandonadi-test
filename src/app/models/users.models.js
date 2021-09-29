import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    password: String, 
    role: String,
}, { collation: 'users' });

module.exports = { User: UserSchema };