import database from './db.js';
import Sequelize from 'sequelize';
 
const Alunos = database.define('Alunos', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    matricula: Sequelize.NUMBER,
    data: Sequelize.STRING,
    status: Sequelize.STRING
  });

export default Alunos;