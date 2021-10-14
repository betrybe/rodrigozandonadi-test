/* eslint-disable max-len */
/* eslint-disable curly */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable max-lines-per-function */
import { body, validationResult } from 'express-validator';

import RecipeService from '../services/recipes.services';

const { verifyJWT, upload } = '../../_helpers';

// eslint-disable-next-line max-lines-per-function
module.exports = ((app) => {
    app.route('/recipes') 
    .get(async (req, res, next) => {
        await RecipeService.find({})
        .then((data) => res.status(200).json({ recipes: data }))
        .catch((erro) => {
            res.status(500).json({ message: 'Deu ruim' });
            console.log(erro);
        });
        next();
    })
    // eslint-disable-next-line max-lines-per-function
    .post(
        body('name').notEmpty().withMessage('O campo name é obrigatório'),
        body('ingredients').notEmpty().withMessage('O campo ingredients é obrigatório'),
        body('preparation').notEmpty().withMessage('O campo preparation é obrigatório'),
        verifyJWT,
        async (req, res, next) => {
            const { name, ingredients, preparation } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } 
            await RecipeService.insert(name, ingredients, preparation)
            // eslint-disable-next-line no-shadow
            .then((data) => res.status(201).json({ recipe: data }))
            .catch((erro) => {
                res.status(400).json({ message: 'Deu ruim' });
                console.log(erro);
            }); 
        next();
        },
    ); 
    app.route('/recipes/:id') 
    .get(async (req, res, next) => {
        await RecipeService.findOne(req.params.id)
        .then((data) => {
            res.status(200).json({ recipe: data });
            console.log(data);
        })
        .catch((erro) => {
            res.status(500).json({ message: 'Deu ruim' });
            console.log(erro);
        });
        next();
    })
    .put(
        body('name').notEmpty().withMessage('O campo name é obrigatório'),
        body('ingredients').notEmpty().withMessage('O campo ingredients é obrigatório'),
        body('preparation').notEmpty().withMessage('O campo preparation é obrigatório'),
        verifyJWT,
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } 
            await RecipeService.update(req.params.id, req.body)
            // eslint-disable-next-line no-shadow
            .then((data) => res.status(201).json({ recipe: data }))
            .catch((erro) => {
                res.status(400).json({ message: 'Deu ruim' });
                console.log(erro);
            }); 
        next();
        },
    )
    .delete(
        verifyJWT,
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } 
            await RecipeService.delete(req.params.id)
            // eslint-disable-next-line no-shadow
            .then((data) => res.status(201).json({ recipe: data }))
            .catch((erro) => {
                res.status(400).json({ message: 'Deu ruim' });
                console.log(erro);
            }); 
        next();
        },
    );
    app.route('/recipes/:id/image/') 
    .post(
        upload.single('image'),
        verifyJWT,
        async (req, res, next) => {
            // eslint-disable-next-line prefer-destructuring
            const id = req.params.id;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            await RecipeService.insertImage(id)
            // eslint-disable-next-line no-shadow
            .then((data) => {
                res.status(201).json({ data });
                console.log(data);
            })
            .catch((erro) => {
                res.status(400).json({ message: 'Deu ruim' });
                console.log(erro);
            }); 
        next();
        },
    );
    app.route('/images/:id.jpeg')
    .get(async (req, res, next) => {
        await RecipeService.findImage(req.params.id)
        .then(() => {
            res.status(200).set({ 'Content-Type': 'image/jpeg' }).send(`<img src="http://localhost:3000/images/${req.params.id}.jpeg">`);
        })
        .catch((erro) => {
            res.status(500).json({ message: 'Deu ruim' }); 
            console.log(erro);
        });
        next();
    });
});
