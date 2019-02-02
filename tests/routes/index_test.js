const app = require('../../app');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('IndexRouter',() => {
    describe('Get', () => {
        it("should see welcome message", async () => {
            chai.request(app).get('/').end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(err).to.be.null;
                expect(res.text.indexOf('Welcome to Shorten URL')).to.be.greaterThan(-1);
            });
        });
    });
    
    describe('Post', () => {
        it("should get a 404", async () => {
            chai.request(app).post('/').send({id: 1}).end((err, res) => {
                expect(res.status).to.be.equal(404);
                expect(err).to.be.null;
            });
        });
    });
});

describe('Unknown route',() => {
    describe('Get', () => {
        it("should see a 404", async () => {
            chai.request(app).get('/unknown').end((err, res) => {
                expect(res.status).to.be.equal(404);
                expect(err).to.be.null;
            });
        });
    });
    
    describe('Post', () => {
        it("should get a 404", async () => {
            chai.request(app).post('/unknown').send({id: 1}).end((err, res) => {
                expect(res.status).to.be.equal(404);
                expect(err).to.be.null;
            });
        });
    });
});