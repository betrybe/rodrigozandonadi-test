/* eslint-disable max-len */
/* eslint-disable curly */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable max-lines-per-function */

import multer from 'multer';
import jwt from 'jsonwebtoken';

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

module.exports = { verifyJWT, upload };