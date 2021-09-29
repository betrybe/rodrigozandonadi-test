import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    password: String, 
    role: String,
}, { collection: 'users' });

module.exports = { 
    UserSchema: userSchema,
    Mongoose: mongoose,
};