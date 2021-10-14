import express from 'express';
import consign from 'consign';

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.set('json spaces', 4);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('src'));  
app.use('/images', express.static('uploads')); 

consign({
  cwd: 'src',
  locale: 'pt-br',
  logger: console,
  verbose: true,
  extensions: ['.js'],
})
.include('database/db.js')
.then('app/controllers')
.into(app);

module.exports = app;
