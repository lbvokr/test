const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String },
    DataTransferItem: { type: String },
    url: { type: String }
},
{
    collection: 'news',
    versionKey : false
});

module.exports = mongoose.model('News', newsSchema);
