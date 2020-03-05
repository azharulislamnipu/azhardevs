const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();

/* 
  Configure cloudinary using enviroment variables 
  Check .env.example for a template of setting the enviroment variables.
*/
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SERCRET,
});

/*
  This function handle the asynchronous action of uploading an image to cloudinary.
  The cloudinary.v2.uploader.upload_stream is used because we are sending a buffer, 
  which the normal cloudinary.v2.upload can't do. More details at https://github.com/cloudinary/cloudinary_npm/issues/130
*/
module.exports = {
  uploadImage (path){

    return cloudinary.v2.uploader.upload(path,{
          folder: process.env.CLOUDINARY_CLOUD_FOLDER || '',
          use_filename: true
         })
  },
  
   uploads(files) {

  let upload_res = files.map(file => new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file.path, {
      folder: process.env.CLOUDINARY_CLOUD_FOLDER || '',
      use_filename: true
     }, (error, result) => {
      if (error) reject(error)
      else resolve(result.secure_url);
    })
  }))

    return upload_res;

   }
        
}