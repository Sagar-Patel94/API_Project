const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/dbConfig");
const categoryRoutes = require("./src/routes/categoryRoute");
const productRoutes = require("./src/routes/productRoute");
const userRoutes = require("./src/routes/userRoute");
const cartRoutes = require("./src/routes/cartRoute");
const uploadRoutes =  require("./src/routes/uploadRoute");
// const multer  = require('multer');
const fileUpload = require('express-fileupload');
const path = require('path');

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: 'public/'
}))

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/')
//   },
//   filename: function (req, file, cb) {
//     // console.log(file, "*****file*****");
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// });
// const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Home Page");
});

// app.post('/home', upload.single('profile'), async (req, res) => {
//   console.log(req.file);
//   let result = {
//     id: 12,
//     test: "demo"
//   }
//   res.status(200).json(result)
// });

app.post('/home', async (req, res) => {
  let fileName = Date.now()+'-'+ req.files.profile.name;
  let newPath = path.join(process.cwd(), 'test', fileName);
  req.files.profile.mv(newPath);
  console.log(req.files);
  let result = {
    id: 12,
    test: "demo"
  }
  res.status(200).json(result)
});

app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);

db.authenticate()
  .then(() => {
    db.sync();
    console.log("database connected !!!!!");
  })
  .catch((err) => {
    console.log("Database connection Error" + err);
  });

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});