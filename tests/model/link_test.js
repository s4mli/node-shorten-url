const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const link = require('../../models/link');
const chai = require('chai');
const expect = chai.expect;

const mockgoose = new Mockgoose(mongoose);

describe('LinkModel', () => {
    before((done) => {
        mockgoose.prepareStorage().then(function () {
            mongoose.connect('mongodb://foobar/baz', done);
        });
    });

    after((done) => {
        mongoose.connection.close(done);
    });

    describe("findOneLink", () => {
        before(async () => {
            await mockgoose.helper.reset();
            await link.linkModel.create({ url: 'http://test.com' });
        });

        after(async () => {
            await mockgoose.helper.reset();
        });

        it('should return null', async () => {
            let found = await link.findOneLink({ idd: 1 });
            expect(found).to.be.null;
        });

        it('should return link with url', async () => {
            let found = await link.findOneLink({ url: 'http://test.com' });
            expect(found.url).to.be.equal('http://test.com');
            expect(found.short).to.be.equal('3');
        });

        it('should return link with short link', async () => {
            let found = await link.findOneLink({ short: '3' });
            expect(found.url).to.be.equal('http://test.com');
            expect(found.short).to.be.equal('3');
        });
    });

    describe("saveNewLink", () => {
        it('should save a url', async () => {
            await link.saveNewLink('http://test123.com');
            let count = await link.linkModel.count();
            expect(count).to.be.equal(1);
        });
    });
})