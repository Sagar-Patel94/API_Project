const express = require("express");
const { use } = require("express/lib/router");

const router = express.Router();

const userController = require("../controllers/userController");

router.post("/login", userController.loginUser);
router.get("/queryInterfaceDataInCart", userController.queryInterfaceDataInCart);
router.post("/", userController.postUser);
router.get("/getCartByUserById/:Id", userController.getCartByUserById);
router.get("/", userController.getAllUser);
router.get("/setterGetter", userController.setterGetter);
router.get("/:Id", userController.getUserById);
router.put("/", userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;