require('dotenv').config()
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { cloudinaryStorage, CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_CLOUD,
    api_secret: process.env.API_SECRET,
});

module.exports = (fieldName) => {
    try {
        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: 'cover',
                resource_type: 'raw',
                public_id: (req,file) =>
                'image - ' +
                new Date().getTime() +
                path.extname(file.originalname),
            },
        });

        const upload = multer({
            storage: storage
        }).single(fieldName);

        return (req,res,next) => {
            upload(req,res, (err) => {
                return next();
            });
        };
    } catch (error) {}
}