const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// const DIR = path.resolve(__dirname, '../../uploads/');

var publicDir = path.join(__dirname,'../public');

app.use(express.static(publicDir));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, publicDir+'/uploads/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb( null, fileName );
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {

        if (file.mimetype == "image/png" || file.mimetype == "application/pdf" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and, pdf .jpeg format allowed!'));
        }
    }
});

module.exports = {
     upload(image){
       return upload.single(image);
     },

     multiUpload(image){
        return upload.array(image,10);
      },

      uploadany(){
        return upload.any();
      },

      uploadfields(file1, max1, file2, max2){
        return  upload.fields([{ name: file1, maxCount: max1 }, { name: file2, maxCount: max2 }]);
      }
}