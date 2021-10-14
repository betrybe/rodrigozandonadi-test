/* eslint-disable no-throw-literal */
const Recipes = require('../models/recipes.models');

exports.find = async (query) => {
    const recipes = await Recipes.find(query).lean().exec();
    return recipes;
};

exports.findOne = async (id) => {
    const recipe = await Recipes.findById(id).lean().exec();
    return recipe;
};

exports.insert = async (reqName, reqIngredients, reqPreparation, reqUser) => {
    const recipe = new Recipes({ 
        name: reqName,
        ingredients: reqIngredients,
        preparation: reqPreparation,
        userId: reqUser,
    });
    const newRecipe = recipe.save();
    return newRecipe;
};

exports.update = async (id, recipeParam, reqUser) => {
    const search = await Recipes.findById(id);

    if (!search) throw 'Recipe not found';
    
    const recipe = new Recipes({ 
        name: recipeParam.name,
        ingredients: recipeParam.ingredients,
        preparation: recipeParam.preparation,
        userId: reqUser,
    });
    const newRecipe = recipe.updateOne(recipe);
    return newRecipe;
};

exports.delete = async (id) => {
    const remove = await Recipes.findByIdAndRemove(id);
    return remove;
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
