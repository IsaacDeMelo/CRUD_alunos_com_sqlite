import express from "express";
import database from './db.js';
import Pessoa from './aluno.js';

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

// Listar todos os usuários
app.get('/pessoa', async (req, res) => {
    const pessoa = await Pessoa.findAll();
    res.render('index', { pessoa });
  });
  
  // Exibir formulário de criação de usuário
  app.get('/pessoa/create', (req, res) => {
    res.render('create');
  });
  
  // Criar um novo usuário
  app.post('/pessoa', async (req, res) => {
    const { name, email, status, matricula, data } = req.body;
    await Pessoa.create({ name, email, status, matricula, data });
    res.redirect('/pessoa');
  });
  
  // Exibir formulário de edição de usuário
  app.get('/pessoa/:id/edit', async (req, res) => {
    const { id } = req.params;
    const pessoa = await Pessoa.findByPk(id);
    res.render('edit', { pessoa });
  });
  
  // Atualizar um usuário
  app.put('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
    const  { name, email, status, matricula, data }  = req.body;
    await Pessoa.update({ name, email, status, matricula, data }, { where: { id } });
    res.redirect('/pessoa');
  });
  
  // Excluir um usuário
  app.get('/pessoa/:id/delete', async (req, res) => {
    const { id } = req.params;
    await Pessoa.destroy({ where: { id } });
    res.redirect('/pessoa');
  });
export default app; 