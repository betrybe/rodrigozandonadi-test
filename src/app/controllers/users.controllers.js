/* eslint-disable curly */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable space-before-blocks */
/* eslint-disable max-lines-per-function */
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import UserService from '../services/users.services';

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
    app.route('/users/admin') 
    .post(
        body('name').notEmpty().withMessage('O campo nome é obrigatório'),
        body('email').notEmpty().withMessage('O campo email é obrigatório'),
        body('email').isEmail().withMessage('O email digitado não é válido.'),
        body('password').notEmpty().withMessage('O campo password é obrigatório'),
        verifyJWT, 
        async (req, res, next) => {
            const { name, email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } 
            await UserService.insertAdmin(name, email, password)
            // eslint-disable-next-line no-shadow
            .then((data) => res.status(201).json({ users: data }))
            .catch((erro) => {
                res.status(400).json({ message: 'Deu ruim' });
                console.log(erro);
            }); 
        next();
        },
    );
}); 
