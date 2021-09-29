import mongoose from 'mongoose';

const DB_NAME = 'Cookmaster';
const MONGO_DB_URL = 'mongodb://localhost:27017';
const DB_URI = `${MONGO_DB_URL}/${DB_NAME}`;

mongoose.connect(`${DB_URI}`)
.then(() => console.log(`API conectada ao banco de dados MongoDB - ${DB_URI}`))
.catch((error) => console.error(`Não foi possível conectar ao bando de dados:${error}`));

const db = mongoose.connection;

module.exports = db;