const Sequelize = require('sequelize');

const sequelize = new Sequelize('products', 'root', 'Deepak@123', {
  dialect: 'mysql',
  
});

module.exports = sequelize;
