/* eslint-disable no-confusing-arrow */
/* eslint-disable max-len */
/* eslint-disable space-before-blocks */
/* eslint-disable max-lines-per-function */
import { body, validationResult } from 'express-validator';

import LoginService from '../services/users.services';

module.exports = ((app) => {
    app.route('/login')
    .post(
        body('email').notEmpty().withMessage('O campo email é obrigatório'),
        body('email').isEmail().withMessage('O email digitado não é válido.'),
        body('password').notEmpty().withMessage('O campo password é obrigatório'),
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } 
            await LoginService.authenticate(req.body)
            .then((data) => data ? res.status(201).json({ auth: true, token: data }) : res.status(404).json({ message: 'Username or password is incorrect' }))
            .catch((err) => next(err)); 
        },
    );
});