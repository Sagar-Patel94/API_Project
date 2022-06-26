const {DataTypes} = require('sequelize');
const sequelize = require('../../config/dbConfig');
const Cart = require('./cart');

const Product = sequelize.define("products", {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey : true
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categories', 
            key: 'Id', 
         }
    },
    Name: {
        type: DataTypes.STRING
    },
    Price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull : false,
        defaultValue : 0
    },
}, {
    createdAt: 'Created_Date',
    updatedAt: 'Updated_Date'
});

// Product.hasMany(Cart,{foreignKey:"ProductId"})
// Cart.belongsTo(Product,{foreignKey:"ProductId"})
module.exports = Product;