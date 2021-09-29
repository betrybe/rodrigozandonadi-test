import db from '../models/users.models';

const Users = db.Mongoose.model('users', db.UserSchema, 'users');

module.exports = ((app) => {
    // rota para listagem de usuários
    app.route('/users')
    .get(async (req, res, next) => {
        await Users.find({}).lean().exec()
        .then((dados) => {
            res.status(200).json({ message: dados });
        })
        .catch((erro) => {
            res.status(500).json({ message: 'Deu ruim' });
            console.log(erro);
        });
        next();
    });
});