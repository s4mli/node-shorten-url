const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    count: { type: Number, default: 0 }
}, {
        timestamps: true,
        collection: 'counters'
    });

module.exports = mongoose.model('counterModel', counterSchema);