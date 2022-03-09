const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({ region: process.env.AWS_REGION });
const bucket = process.env.S3_BUCKET;

const fileStorage = multerS3({
    s3,
    acl: 'private',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    contentDisposition: "inline",
    bucket,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, callback) => {
        const fileName = "photos/" + new Date().getTime() + "-" + file.originalname;
        callback(null, fileName);
    }
});

const uploadImageToS3 = multer({ storage: fileStorage }).single("image");



module.exports = {
    uploadImageToS3
};
