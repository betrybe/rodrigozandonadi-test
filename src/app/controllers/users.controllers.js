import db from '../models/users.models';

const { body, validationResult } = require('express-validator');

const Users = db.Mongoose.model('users', db.UserSchema, 'users');

// eslint-disable-next-line max-lines-per-function
module.exports = ((app) => {
    app.route('/users')        
    .get(async (req, res, next) => {
        await Users.find({}).lean().exec()
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
            let { name, email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let users = new Users({ name, email, password });
            await users.save()
                .then((data) => res.status(200).json({ users: data }))
                .catch((erro) => {
                    res.status(500).json({ message: 'Deu ruim' });
                    console.log(erro);
                })
            ; 
            next();
        });
});