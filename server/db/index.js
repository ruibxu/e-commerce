const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config();


/*
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

module.exports = sequelize;
*/

const sequelize = new Sequelize(process.env.LOCAL_DB_NAME, process.env.LOCAL_DB_USER, process.env.DB_PASSWORD, {
  host: process.env.LOCAL_DB_HOST,
  dialect: 'mysql',
  timezone: '-04:00'
});




/*
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
*/

module.exports = sequelize;
