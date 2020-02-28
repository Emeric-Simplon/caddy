const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: String,
    description: String,
    price: Number,
    quantity: Number,
    imgUrl: String,
    createdOn: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Product', productSchema); 