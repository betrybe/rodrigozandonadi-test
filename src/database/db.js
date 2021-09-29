import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/Cookmaster')
.then(() => console.log('API conectada ao banco de dados MongoDB'))
.catch((error) => console.error(`Não foi possível conectar ao bando de dados:${error}`));

const db = mongoose.connection;

module.exports = db;