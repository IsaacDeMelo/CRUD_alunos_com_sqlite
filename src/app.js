import express from "express";
import database from './db.js';
import Pessoa from './aluno.js';
import Sequelize from 'sequelize';

const { Op } = Sequelize;
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
await database.sync();

app.use((req, res, next) => {
  if (req.body._method && req.body._method.toUpperCase() === 'PUT') {
    req.method = 'PUT';
  }
  next();
});
app.get('/', (req, res) => {
  res.redirect('/index')
});
app.get('/index', async (req, res) => {
  const pessoa = await Pessoa.findAll();
  res.render('index', { pessoa });
});
app.get('/index/reset-ids', async (req, res) => {
  try {
    await Pessoa.destroy({ where: {} });
    await database.query('DELETE FROM sqlite_sequence WHERE name="Pessoa"');
    res.redirect('/index');
  } catch (error) {
    console.error('Erro ao resetar IDs:', error);
    res.status(500).send('Erro ao resetar IDs');
  }
});
app.get('/index/create', (req, res) => {
  res.render('create');
});
app.post('/index', async (req, res) => {
  const { name, email, status, data } = req.body;

  function gerarMatricula(anoMatricula) {
    const parteAleatoria = Math.floor(100000 + Math.random() * 900000);
    return `${anoMatricula}${parteAleatoria}`;
  }
  const anoAtual = new Date().getFullYear();
  const matricula = gerarMatricula(anoAtual);
  await Pessoa.create({ name, email, status, data, matricula });
  res.redirect('/index');
});
app.get('/index/:id/edit', async (req, res) => {
  const { id } = req.params;
  const pessoa = await Pessoa.findByPk(id);
  res.render('edit', { pessoa });
});
app.put('/index/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, status, matricula, data } = req.body;
  await Pessoa.update({ name, email, status, matricula, data }, { where: { id } });
  res.redirect('/index');
});
app.get('/index/:id/delete', async (req, res) => {
  const { id } = req.params;
  await Pessoa.destroy({ where: { id } });
  res.redirect('/index');
});
app.post('/index/seach', async (req, res) => {
  const { name } = req.body;
  const pessoa = await Pessoa.findAll({ where: { name: { [Op.like]: `%${name}%` } } })
  res.render('index', { pessoa })
});
export default app; 