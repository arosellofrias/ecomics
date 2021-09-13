const Sequelize = require('sequelize');
/* const db = new Sequelize('ecomics', "postgres", "lalalala.", {
  logging: false,
  host: 'localhost',
  dialect: 'postgres'
}); */
 const db = new Sequelize('ecomics', null, null, {
     logging: false,
     host: 'localhost',
     dialect: 'postgres'
   });

module.exports = db