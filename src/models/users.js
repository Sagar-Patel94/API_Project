const {DataTypes} = require('sequelize');
const sequelize = require('../../config/dbConfig');
const Cart = require('../models/cart');

const User = sequelize.define("users", {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        // set(val) {
        //     return this.setDataValue('Name',val+ ' Patel')
        // },
        // get() {
        //     return this.getDataValue('Name')+' XYZ';
        // }
    },
    Email: {
        type: DataTypes.STRING,
        unique: true
    },
    Gender: {
        type: DataTypes.STRING
    },
    Mobile: {
        type: DataTypes.INTEGER,
        unique: true
    },
    IsActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    IsDeleted:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    Password: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    createdAt: 'Created_Date',
    updatedAt: 'Updated_Date'
});

// User.sync({force: false});

module.exports = User;