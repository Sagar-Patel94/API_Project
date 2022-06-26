const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('apicrudtaskdb', 'root', '123456', {
    host:'localhost',
    dialect:'mysql',
    pool:{max:5,min:0,idle:10000},
    logging: false,
    
});
// sequelize.sync();
module.exports = sequelize;

// sequelize.authenticate()
// .then(() => {
//     console.log('connected');
// })
// .catch(err => {
//     console.log('Error'+err);
// });

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.categories = require('../src/models/categories')(sequelize, DataTypes);

// db.sequelize.sync()
// .then(() => {
//     console.log("Yes re-sync");
// });

// module.exports = db;