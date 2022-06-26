const Category = require("../models/categories");
const Product = require("../models/products");

exports.postCategory = async (req, res) => {
  let name = req.body.Name;
  let data = await Category.create({ Name: name });
  let responce = {
    data: data,
    message: "Data successfully inserted",
  };
  return res.status(200).json(responce);
};

exports.getCategoryList = async (req, res) => {
  let data = await Category.findAll();
  let response = {
    data: data,
    message: "Data successfully fetched",
  };
  return res.status(200).json(response);
};

exports.getCategoryById = async (req, res) => {
  console.log("====== GET ===========");
  let id = req.params.Id;
  let data = await Category.findByPk(id);
  let responce = {
    data: data,
    message: "Data successfully fetched by Id",
  };
  return res.status(200).json(responce);
};

exports.updateCategory = async (req, res) => {
  let id = req.body.Id;
  let name = req.body.Name;
  let data = await Category.update({ Name: name }, { where: { Id: id } });
  let responce = {
    data: data,
    message: "Data successfully updated",
  };
  return res.status(200).json(responce);
};

exports.deleteCategory = async (req, res) => {
  let data = await Category.destroy({ where: { Id: req.body.Id } });
  let responce = {
    data: data,
    message: "Data successfully deleted",
  };
  return res.status(200).json(responce);
};

exports.getProductsByCategory = async (req, res) => {
  let data = await Category.findAll({
    include: [
      {
        model: Product,
      },
    ],
  });
  return res.status(200).json(data);
};

exports.getProductsByCategoryById = async (req, res) => {
  let id = req.params.Id;
  let data = await Category.findByPk(id, {
    include: [
      {
        model: Product,
      },
    ],
  });
  return res.status(200).json(data);
};