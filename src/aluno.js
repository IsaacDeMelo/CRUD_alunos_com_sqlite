import database from './db.js';
import Sequelize from 'sequelize';
 
const Pessoa = database.define('Pessoa', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    matricula: Sequelize.INTEGER,
    data: Sequelize.STRING,
    status: Sequelize.STRING
}, {
    tableName: 'Pessoa'
  });
export default Pessoa;