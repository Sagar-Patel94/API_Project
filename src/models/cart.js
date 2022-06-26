const {DataTypes} = require('sequelize');
const sequelize = require('../../config/dbConfig');
const User = require('../models/users');

const Cart = sequelize.define("cart", {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey : true
    },
    ProductId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products', 
            key: 'Id', 
         }
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users', 
            key: 'Id', 
         }
    },
    Quentity: {
        type: DataTypes.INTEGER
    },
    TotalPrice: {
        type: DataTypes.DECIMAL(10,2),
        allowNull : false,
        defaultValue : 0,
    },
}, {
    createdAt: 'Created_Date',
    updatedAt: 'Updated_Date'
}); 

// Cart.sync({force: true})
User.hasMany(Cart, {foreignKey: "UserId"});
Cart.belongsTo(User, {foreignKey: "UserId"});

Cart.addScope('checkProductId', {
    where: {
        ProductId: 22
    }
});

module.exports = Cart;