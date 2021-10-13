const Recipes = require('../models/recipes.models');

exports.find = async (query) => {
    const recipes = await Recipes.find(query).lean().exec();
    return recipes;
};

exports.findOne = async (id) => {
    const recipe = await Recipes.findById(id).lean().exec();
    return recipe;
};

exports.insert = async (reqName, reqIngredients, reqPreparation) => {
    const recipe = new Recipes({ 
        name: reqName,
        ingredients: reqIngredients,
        preparation: reqPreparation,
    });
    const newRecipe = recipe.save();
    return newRecipe;
};

// eslint-disable-next-line max-params
exports.insertImage = async (reqId) => {
    // eslint-disable-next-line no-undef
    const newRecipe = await Recipes.findByIdAndUpdate(
        { _id: reqId }, 
        { image: `http://localhost:3000/src/uploads/${reqId}.jpeg` },
    );
    return newRecipe;
};

exports.findImage = async (id) => {
    const recipes = await Recipes.findById(id).lean().exec();
    return recipes;
};
