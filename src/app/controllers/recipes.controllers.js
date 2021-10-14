/* eslint-disable curly */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable max-lines-per-function */
import { body, validationResult } from 'express-validator';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import RecipeService from '../services/recipes.services';

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({
        auth: false,
        message: 'No token provided.',
    });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({
            auth: false,
            message: 'Failed to authenticate token.',
        });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.params.id}.jpeg`);
    },
});
const upload = multer({ storage: storage });

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
    .put()
    .delete();
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
        .then((data) => {
            res.status(200).set({ 'Content-Type': 'image/jpeg' }).send(`<img src="http://localhost:3000/images/${req.params.id}.jpeg">`);
        })
        .catch((erro) => {
            res.status(500).json({ message: 'Deu ruim' }); 
            console.log(erro);
        });
        next();
    });
});
