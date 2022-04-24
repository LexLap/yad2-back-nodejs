const express = require('express');
const { uploadImageToS3 } = require('../middleware/s3-handlers');
const Image = require('../models/imageModel');
const router = new express.Router();
const getFileType = require('../utils/getFileType');


router.post('/', uploadImageToS3, async (req, res) => {

    console.log('incoming image')
    if (!req.file) {
        res.status(422).send({
            code: 422,
            message: "File not uploaded"
        });
    }

    const fileType = getFileType(req.file.originalname)

    const image = new Image({
        originalName: req.file.originalname,
        storageName: req.file.key.split("/")[1],
        bucket: process.env.S3_BUCKET,
        region: process.env.AWS_REGION,
        key: req.file.key,
        ownerID: req.query.id,
        fileType
    });

    try {
        await image.save();

        res.send(image);
    } catch (err) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})


module.exports = router;