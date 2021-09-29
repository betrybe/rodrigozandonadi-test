import db from '../models/users.models';

const Users = db.Mongoose.model('users', db.UserSchema, 'users');

// eslint-disable-next-line max-lines-per-function
module.exports = ((app) => {
    app.route('/users')
    .get(async (req, res, next) => {
        await Users.find({}).lean().exec()
        .then((data) => res.status(200).json({ users: data }))
        .catch((erro) => res.status(500).json({ message: 'Deu ruim' }));
        next();
    })
    .post(async (req, res, next) => {
        let users = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'user',
        });
        await users.save()
        .then((data) => res.status(200).json({ users: data }))
        .catch((erro) => res.status(500).json({ message: 'Deu ruim' }));
        next();
    });
});