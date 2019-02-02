const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const app = require('../../app');
const link = require('../../models/link');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const mockgoose = new Mockgoose(mongoose);

describe('LinksRouter', () => {
    before((done) => {
        mockgoose.prepareStorage().then(function () {
            mongoose.connect('mongodb://foobar/baz', done);
        });
    });

    after((done) => {
        mongoose.connection.close(done);
    });

    describe('Get', () => {
        describe('When database is empty', () => {
            it("should get a 404 when no short provided", (done) => {
                chai.request(app).get('/links').end((err, res) => {
                    expect(res.status).to.be.equal(404);
                    expect(err).to.be.null;
                    done();
                });
            });

            it("should get a 200 when no short link found", (done) => {
                chai.request(app).get('/links/123').end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(err).to.be.null;
                    expect(res.text).to.be.equal('{"error":"not found 123"}');
                    done();
                });
            });
        });

        describe('When database is not empty', () => {
            before((done) => {
                mockgoose.helper.reset().then(() => {
                    link.linkModel.create({ url: 'http://test.com' }, done);
                });
            });

            after((done) => {
                mockgoose.helper.reset().then(done);
            });

            it("should have 1 record", async () => {
                let count = await link.linkModel.count();
                expect(count).to.be.equal(1);
            });

            it("should get a 200 with an existing short link", async () => {
                let links = await link.linkModel.find();
                links.forEach((lk, _) => {
                    chai.request(app).get('/links/' + lk.short).end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(err).to.be.null;
                    });
                });
            });

            it("should get a 200 when no short links in database", async () => {
                chai.request(app).get('/links/xyz').end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(err).to.be.null;
                    expect(res.text).to.be.equal('{"error":"not found xyz"}');
                });
            });


        });
    });

    describe('Post', () => {
        it("should get a 400 when no url provided", async () => {
            chai.request(app).post('/links').send({ id: 1 }).end((err, res) => {
                expect(res.status).to.be.equal(400);
                expect(err).to.be.null;
                expect(res.text).to.be.equal('{"error":"missing para url"}');
            });
        });

        it("should get a 400 with invalid url", async () => {
            chai.request(app).post('/links').send({ url: "1" }).end((err, res) => {
                expect(res.status).to.be.equal(400);
                expect(err).to.be.null;
                expect(res.text).to.be.equal('{"error":"invalid url 1"}');
            });
        });

        it("should get a 200 with valid url",  (done) => {
            chai.request(app).post('/links').send({ url: "http://www.test.com.au" }).end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(err).to.be.null;
                expect(res.text).to.be.equal('{"url":"http://www.test.com.au","short":"3"}');
                done();
            });
        });

        it("should return existing one rather than create a new one", (done) => {
            chai.request(app).post('/links').send({ url: "http://www.test.com.au" }).end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(err).to.be.null;
                expect(res.text).to.be.equal('{"url":"http://www.test.com.au","short":"3"}');
                done();
            });
        });
        
    });
});