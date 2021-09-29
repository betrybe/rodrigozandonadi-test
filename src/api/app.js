import express from 'express';
import consign from 'consign';

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

consign({
  cwd: 'src',
  locale: 'pt-br',
  logger: console,
  verbose: true,
  extensions: ['.js'],
})
.include('database/db.js')
.then('app')
.into(app);

module.exports = app;
