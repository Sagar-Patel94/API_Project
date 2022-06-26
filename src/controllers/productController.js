const Product = require('../models/products');
const Category = require('../models/categories');

exports.postProduct = async (req, res) => {
    let categoryId = req.body.CategoryId;
    let name = req.body.Name;
    let data = await Product.create({CategoryId: categoryId, Name: name});
    let responce = {
        data: data,
        message: "Data successfully inserted"
    };
    return res.status(200).json(responce);
};

exports.getAllProduct = async (req, res) => {
    let data = await Product.findAll({});
    let responce = {
        data: data,
        message: "Data successfully fetched"
    };
    return res.status(200).json(responce);
};

exports.getProductById = async (req, res) => {
    let id = req.params.Id;
    let data = await Product.findByPk(id);
    let responce = {
        data: data,
        message: "Data successfully fetched by Id"
    };
    return res.status(200).json(responce);
};

exports.updateProduct = async (req, res) => {
    let id = req.body.Id;
    let name = req.body.Name;
    let data = await Product.update({Name: name}, {where: {Id: id}});
    let responce = {
      data: data,
      message: "Data successfully updated"
    };
    return res.status(200).json(responce);
  };

  exports.deleteProduct = async (req, res) => {
    let id = req.body.Id;
    let data = await Product.destroy({where: {Id: id}});
    let responce = {
      data: data,
      message: "Data successfully deleted"
    };
    return res.status(200).json(responce);
  };

  exports.getProductByCategoryId = async (req, res) => {
    let id = req.params.CategoryId;
    let data = await Product.findAll({
      where :{
        CategoryId : id
      }
    })
    let responce = {
        data: data,
        message: "Data successfully fetched by CategoryId"
    };
    return res.status(200).json(responce);
};

exports.getCategoryByProducts = async (req, res) => {
  let data = await Product.findAll({
    include: [
      {
        model: Category,
      },
    ],
  });
  return res.status(200).json(data);
};

exports.getCategoryByProductsById = async (req, res) => {
  let id = req.params.Id;
  let data = await Product.findByPk(id, {
    include: [
      {
        model: Category,
      },
    ],
  });
  return res.status(200).json(data);
};