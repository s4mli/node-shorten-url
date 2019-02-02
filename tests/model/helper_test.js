const chai = require('chai');
const expect = chai.expect;
const helper = require('../../models/helper');

describe('Helper', () => {
    describe('Encode/Decode simple ones', () => {
        const encodes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const decodes = ["3", "4", "5", "6", "7", "8", "9", "b", "c"];

        it('Shold encode simple ones', async () => {
            encodes.forEach((num, index) => {
                let e = helper.encode(num);
                expect(e).to.be.equal(decodes[index]);
            });
        });

        it('Shold decode simple ones', async () => {
            decodes.forEach((num, index) => {
                let e = helper.decode(num);
                expect(e).to.be.equal(encodes[index]);
            });
        });
    });

    describe('Encode/Decode complex ones', () => {
        const encodes = [111, 2222, 33333, 444444, 5555555, 66666666, 777777777,
            8888888888, 9876543210123456789];
        const decodes = ["4c", "TC", "gRD", "5nVD", "RVYv", "cTCbz", "4g-njH",
            "xNXC__", "3F-k6jt68qQY"];

        it('Shold encode complex ones', async () => {
            encodes.forEach((num, index) => {
                let e = helper.encode(num);
                expect(e).to.be.equal(decodes[index]);
            });
        });

        it('Shold decode complex ones', async () => {
            decodes.forEach((num, index) => {
                let e = helper.decode(num);
                expect(e).to.be.equal(encodes[index]);
            });
        });
    });
});