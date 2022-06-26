// const { Op } = require('sequelize/types');
const Cart = require("../models/cart");
const Product = require("../models/products");
const User = require("../models/users");
const Category = require("../models/categories");
const { Sequelize, Op, QueryTypes, DataTypes } = require("sequelize");

exports.postCart = async (req, res) => {
  let productId = req.body.ProductId;
  let userId = req.body.UserId;
  let quentity = req.body.Quentity;
  let product = await Product.findOne({
    where: { Id: productId, Name: req.body.name },
  });
  let totalPrice = product.Price * quentity;
  let data = await Cart.create({
    ProductId: productId,
    UserId: userId,
    Quentity: quentity,
    TotalPrice: totalPrice,
  });
  return res.status(200).json(data);
};

exports.getAllCart = async (req, res) => {
  let data = await Cart.findAll({});
  return res.status(200).json(data);
};

exports.getCartById = async (req, res) => {
  let id = req.params.Id;
  let data = await Cart.findByPk(id);
  return res.status(200).json(data);
};

exports.updateCart = async (req, res) => {
  let id = req.body.Id;
  let productId = req.body.ProductId;
  let userId = req.body.UserId;
  let quentity = req.body.Quentity;
  await Cart.update(
    { ProductId: productId, UserId: userId, Quentity: quentity },
    { where: { Id: id } }
  );
  let responce = {
    message: "Data successfully updated",
  };
  return res.status(200).json(responce);
};

exports.deleteCart = async (req, res) => {
  let id = req.body.Id;
  await Cart.destroy({ where: { Id: id } });
  let responce = {
    message: "Data successfully deleted",
  };
  return res.status(200).json(responce);
};

exports.queryData = async (req, res) => {
  let data = await Cart.findAll({
    // where: {
    //   Id: {
    //     [Op.gt]: 2,
    //   },
    // },
    // order: [["Quentity"]],
    // group: ["UserId"],
    // limit: 2,
    // offset: 1,
  });
     return res.status(200).json(data);

//   let countData = await Cart.count({});

//   let response = {
//     count_Data: countData,
//   };
//   res.status(200).json(response);
};

exports.finderData = async (req, res) => {
  // let data = await Cart.findAndCountAll({
  //     where: {
  //         Quentity: 4
  //     }
  // });
  // res.status(200).json(data);

  let [data, created] = await Cart.findOrCreate({
    where: {
      Quentity: 8,
    },
  });
  let response = {
    data: data,
    add: created,
  };
  res.status(200).json(response);
};

exports.getUserByCartById = async (req, res) => {
  let id = req.params.Id;
  let data = await Cart.findByPk(id, {
    include: [
      {
        model: User
      }
    ]
  });
  return res.status(200).json(data);
};

exports.scopeInCart = async (req, res) => {
  let data = await Cart.scope(['checkProductId']).findAll({});
  return res.status(200).json(data);
};

exports.polymorphicInCart = async (req, res) => {
  let data = await Category.findAll({
    include: [Product]
  });
  return res.status(200).json(data);
};