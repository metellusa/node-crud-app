const expect = require('chai').expect
const supertest = require('supertest');
const app = require('../app');

describe('Positive test: get all products successfully', function () {

    let body;
    before(() => {
       return supertest(app)
            .get(`/products`)
            .then((res) => {
                body = res.body;
            })
    })

    it(`Should return a 200 status code`, () => {
        expect(body).to.have.a.property('statusCode', 200);
    })
    it(`Should have a result object`, () => {
        expect(body).to.have.a.property('result').that.is.an('array');
    })
    it(`Should have a success message`, () => {
        expect(body).to.have.a.property('message').that.equals('Products retrieved successfully!');
    })
});