const express = require('express')
const router = new express.Router()
const Advertisement = require('../models/adModel')


router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const ad = new Advertisement(req.body)
        await ad.save()
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Internal server error"
        })
    }
    res.send('OK')
})


router.post('/get-ads', async (req, res) => {

    try {
        const searchQuery = req.body
        const {
            page,
            propTypes,
            propFeatures,
            roomsAmount,
            priceRange,
            floorRange,
            sizeRange,
            entryDate
        } = searchQuery


        const roomsAmountHigh = roomsAmount?.high ? parseInt(roomsAmount.high) : 100
        const roomsAmountLow = roomsAmount?.low ? parseInt(roomsAmount.low) : 0
        const priceRangeHigh = priceRange?.high ? parseInt(priceRange.high) : 1000000000
        const priceRangeLow = priceRange?.low ? parseInt(priceRange.low) : 0
        const floorRangeHigh = floorRange?.high ? parseInt(floorRange.high) : 1000000000
        const floorRangeLow = floorRange?.low ? parseInt(floorRange.low) : 0
        const sizeRangeHigh = sizeRange?.high ? parseInt(sizeRange.high) : 1000000000
        const sizeRangeLow = sizeRange?.low ? parseInt(sizeRange.low) : 0


        const ads = await Advertisement.find({
            propertyType: propTypes?.length > 0 ? { $in: [...propTypes] } : { $ne: '' },
            propFeatures: propFeatures?.length > 0 ? { $in: [...propFeatures] } : { $ne: '' },
            roomsAmmount: { $lte: roomsAmountHigh, $gte: roomsAmountLow },
            price: { $lte: priceRangeHigh, $gte: priceRangeLow },
            floor: { $lte: floorRangeHigh, $gte: floorRangeLow },
            builtArea: { $lte: sizeRangeHigh, $gte: sizeRangeLow },
        }).skip((page - 1) * 3).limit(3).exec();


        if (ads) return res.send(ads);
        res.send([]);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal server error"
        })
    }
});


module.exports = router 