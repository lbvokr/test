const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    url: { type: String }
},
{
    collection: 'agent',
    versionKey : false
});

module.exports = mongoose.model('Agent', agentSchema);
