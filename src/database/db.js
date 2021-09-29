import mongoose from 'mongoose';

mongoose.connect('mongodb://mongodb:27017/Cookmaster')
.then((conn) => console.log(`API conectada ao banco de dados MongoDB:${conn}`))
.catch((error) => console.error(`Não foi possível conectar ao bando de dados:${error}`));

const db = mongoose.connection;

module.exports = db;