const {DataTypes} = require('sequelize');
const sequelize = require('../../config/dbConfig');
const Product = require('../models/products');

const Category = sequelize.define("categories", {
    Id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name:{
        type: DataTypes.STRING
    },
    IsActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    IsDeleted:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
},{
    createdAt: 'Created_Date',
    updatedAt: 'Updated_Date'
});

Category.hasMany(Product, {foreignKey: "CategoryId"});
Product.belongsTo(Category, {foreignKey: "CategoryId"});

module.exports = Category;