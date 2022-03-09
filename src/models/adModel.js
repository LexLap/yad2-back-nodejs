const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    ownerID: {
        type: String
    },
    formID: {
        type: String
    },
    propertyType: {
        type: String
    },
    propertyCondition: {
        type: String
    },
    city: {
        type: String
    },
    street: {
        type: String
    },
    houseNum: {
        type: Number
    },
    floor: {
        type: Number
    },
    totalFloors: {
        type: Number
    },
    isOnPillars: {
        type: Boolean
    },
    hood: {
        type: String
    },
    isMailUpdatesAccepted: {
        type: Boolean
    },
    roomsAmmount: {
        type: Number
    },
    parkingLotsAmmount: {
        type: Number
    },
    balconiesAmmount: {
        type: Number
    },
    propFeatures: {
        type: Array,
        default: []
    },
    feature0: {
        type: Boolean
    },
    feature1: {
        type: Boolean
    },
    feature2: {
        type: Boolean
    },
    feature3: {
        type: Boolean
    },
    feature4: {
        type: Boolean
    },
    feature5: {
        type: Boolean
    },
    feature6: {
        type: Boolean
    },
    feature7: {
        type: Boolean
    },
    feature8: {
        type: Boolean
    },
    feature9: {
        type: Boolean
    },
    feature10: {
        type: Boolean
    },
    feature11: {
        type: Boolean
    },
    description: {
        type: String
    },
    builtArea: {
        type: Number
    },
    overallArea: {
        type: Number
    },
    price: {
        type: Number
    },
    entryDate: {
        type: String
    },
    contactName: {
        type: String
    },
    mainNumber: {
        type: String
    },
    isVirtualNumberAccepted: {
        type: Boolean
    },
    isCallOnWeekendAccepted: {
        type: Boolean
    },
    email: {
        type: String
    },
    photoUrls: {
        type: Array
    }
});

const Advertisement = mongoose.model("Advertisement", adSchema);

module.exports = Advertisement;