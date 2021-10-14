/* eslint-disable space-before-blocks */
/* eslint-disable max-lines-per-function */
import { body, validationResult } from 'express-validator';

import jwt from 'jsonwebtoken';
import 'dotenv/config';

import UserService from '../services/users.services';

// eslint-disable-next-line max-lines-per-function
module.exports = ((app) => {
    app.route('/users')        
    .get(async (req, res, next) => {
        await UserService.find({})
        .then((data) => res.status(200).json({ users: data }))
        .catch((erro) => {
            res.status(500).json({ message: 'Deu ruim' });
            console.log(erro);
        });
        next();
    })
    // eslint-disable-next-line max-lines-per-function
    .post(
        body('name').notEmpty().withMessage('O campo nome é obrigatório'),
        body('email').notEmpty().withMessage('O campo email é obrigatório'),
        body('email').isEmail().withMessage('O email digitado não é válido.'),
        body('password').notEmpty().withMessage('O campo password é obrigatório'),
        async (req, res, next) => {
            const { name, email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } 
            await UserService.insert(name, email, password)
            // eslint-disable-next-line no-shadow
            .then((data) => res.status(201).json({ users: data }))
            .catch((erro) => {
                res.status(400).json({ message: 'Deu ruim' });
                console.log(erro);
            }); 
        next();
        },
    ); 
    app.route(
        '/login',
        body('email').notEmpty().withMessage('O campo email é obrigatório'),
        body('email').isEmail().withMessage('O email digitado não é válido.'),
        body('password').notEmpty().withMessage('O campo password é obrigatório'),
        async (req, res) => {
            if (req.body.email === 'luiz' && req.body.password === '123'){
                // auth ok
                const id = 1; // esse id viria do banco de dados
                const jwtToken = jwt.sign({ id }, process.env.SECRET, {});
                return res.json({ auth: true, token: jwtToken });
              }
              res.status(500).json({ message: 'Login inválido!' });
        },
    );
}); 
