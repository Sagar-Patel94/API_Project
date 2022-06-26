const User = require("../models/users");
const Cart = require("../models/cart");
const Sequelize = require("../../config/dbConfig");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postUser = async (req, res) => {
  let name = req.body.Name;
  let email = req.body.Email;
  let gender = req.body.Gender;
  let mobile = req.body.Mobile;
  let password = req.body.Password;
  const salt = await Bcrypt.genSalt(10);
  password = await Bcrypt.hash(password, salt);
  let data = await User.create({
    Name: name,
    Email: email,
    Gender: gender,
    Mobile: mobile,
    Password: password,
  });
  return res.status(200).json(data);
};

exports.getAllUser = async (req, res) => {
  let token = req.headers.token.split(" ")[1];
  jwt.verify(token, "secret", async function (err, decoded) {
    if (decoded) {
      let data = await User.findAll({});
      return res.status(200).json(data);
    } else {
      return res.status(200).send("Invalid Token");
    }
  });
  let decode = jwt.decode(token, { expiresIn: '24h' });
  console.log(decode);
};

exports.getUserById = async (req, res) => {
  let id = req.params.Id;
  let data = await User.findByPk(id);
  return res.status(200).json(data);
};

exports.updateUser = async (req, res) => {
  let id = req.body.Id;
  let name = req.body.Name;
  let email = req.body.Email;
  let gender = req.body.Gender;
  let mobile = req.body.Mobile;
  let password = req.body.Password;

  const salt = await Bcrypt.genSalt(5);
  password = await Bcrypt.hash(password, salt);
  // console.log(password);

  await User.update(
    {
      Name: name,
      Email: email,
      Gender: gender,
      Mobile: mobile,
      Password: password,
    },
    { where: { Id: id } }
  );
  let responce = {
    message: "Data successfully updated",
  };
  return res.status(200).json(responce);
};

exports.deleteUser = async (req, res) => {
  let id = req.body.Id;
  await User.destroy({ where: { Id: id } });
  let responce = {
    message: "Data successfully deleted",
  };
  return res.status(200).json(responce);
};

exports.setterGetter = async (req, res) => {
  let data = await User.findAll({});
  let response = {
    data: data,
  };
  res.status(200).json(response);
};

exports.getCartByUserById = async (req, res) => {
  let id = req.params.Id;
  let data = await User.findByPk(id, {
    include: [
      {
        model: Cart,
      },
    ],
  });
  return res.status(200).json(data);
};

const queryInterface = Sequelize.getQueryInterface();
exports.queryInterfaceDataInCart = async (req, res) => {
  //   queryInterface.addColumn('users', 'Password', {
  //     type: DataTypes.STRING
  //   });
  //   let response = {
  //     message: "Column successfully added"
  //   }
  //   return res.status(200).json(response);
  // queryInterface.removeColumn('users', 'Password');
  // let response = {
  //   message: "Column successfully deleted"
  // }
  // return res.status(200).json(response);
};

exports.loginUser = async (req, res) => {
  let email = req.body.Email;
  let password = req.body.Password;
  let message = "";
  let token = "";

  await User.findOne({
    where: {
      Email: email,
    },
  })
    .then(async (data) => {
      // console.log(data, "dataaaaaaaaaaaa");
      if (email == "" && password == "") {
        message = "Please enter email and password";
      } else if (data) {
        const hashPassword = data.Password;
        await Bcrypt.compare(password, hashPassword)
          .then((result) => {
            if (result) {
              token = jwt.sign({ Email: email, Id: data.id }, "secret");
              message = "Login successfull";
            } else {
              message = "Password is incorrect";
            }
          })
          .catch((err) => {
            console.log(err, "=== err ===");
            return res.status(200).json(err);
          });
      } else {
        message = "Invalid Email";
      }
      console.log(message);
      let response = {
        message: message,
        userToken: token,
      };
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.error(error);
      return res.status(200).json(error);
    });
};