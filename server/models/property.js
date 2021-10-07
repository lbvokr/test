const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    price: { type: String },
    description: { type: String },
    dateListed: { type: String },
    availability: { type: Boolean },
    url: { type: String }
},
{
    collection: 'property',
    versionKey : false
});

module.exports = mongoose.model('Property', propertySchema);
