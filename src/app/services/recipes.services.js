const Recipes = require('../models/recipes.models');

exports.find = async (query) => {
    const recipes = await Recipes.find(query).lean().exec();
    return recipes;
};

exports.findOne = async (id) => {
    const recipes = await Recipes.findById(id).lean().exec();
    return recipes;
};

exports.insert = async (reqName, reqIngredients, reqPreparation) => {
    const recipes = new Recipes({ 
        name: reqName,
        ingredients: reqIngredients,
        preparation: reqPreparation,
    });
    const newRecipes = recipes.save();
    return newRecipes;
};
