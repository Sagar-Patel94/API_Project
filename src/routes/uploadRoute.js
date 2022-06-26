const express = require('express');
const multer  = require('multer');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

const storageImage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/')
    },
    filename: function(req, file, cb) {
        // console.log(file);
        let newName = Date.now()+'-'+file.originalname;
        cb(null, newName)
    }
})
const uploadImage = multer({ storage: storageImage });

// const uploadImage = multer({ dest: 'public/' });

// router.post('/profile', uploadImage.array('profile_pic'), uploadController.userProfile);
router.post('/profile', uploadImage.single('profile_pic'), uploadController.userProfile);
// router.post('/profile', uploadImage.none(), uploadController.userProfile);

module.exports = router;