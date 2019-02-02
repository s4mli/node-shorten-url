const mongoose = require('mongoose');
const counter = require('./counter');
const helper = require('./helper');

const linkSchema = new mongoose.Schema({
    url: { type: String, required: true },
    short: { type: String }
}, {
        timestamps: true,
        collection: 'links'
    });

linkSchema.pre('save', async function (next) {
    const link = this;
    try {
        const linkCounter = await counter.findOneAndUpdate(
            { _id: 'linkCount' },
            { $inc: { count: 1 } },
            { new: true, upsert: true },
        );
        link.short = helper.encode(linkCounter.count);
        next();
    } catch (err) {
        next(err);
    }
});

const linkModel = mongoose.model('linkModel', linkSchema);

findOneLink = async (condition) => {
    return await linkModel.findOne(condition);
};

saveNewLink = async (url) => {
    let newLink = new linkModel({ url: url });
    await newLink.save();
    return newLink;
};

module.exports = {
    linkModel: linkModel,
    findOneLink: findOneLink,
    saveNewLink: saveNewLink
}