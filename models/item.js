require('dotenv').config();


const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  dialect: 'postgres'
});


const Item = sequelize.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

Item.sync({ force: false }).then(() => {
    console.log('Table "items" has been created successfully.');
}).catch(error => console.log('Error creating table "items":', error));


module.exports = Item;
