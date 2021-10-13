import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    name: String, 
    ingredients: String, 
    preparation: String, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    image: String,
});

module.exports = mongoose.model('recipes', RecipeSchema);