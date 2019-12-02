const expect = require('chai').expect
const supertest = require('supertest');
const nock = require('nock');
const app = require('../app');

describe('Positive test: get all products successfully', function () {
    let response;
    before(() => {
       return supertest(app)
            .get(`/products`)
            .then((res) => {
                response = res;
            })
    })
    it(`Should return a 200 status code`, () => {
        expect(response).to.have.a.property('statusCode', 200);
    })
    it(`Should have a result object`, () => {
        expect(response.body).to.have.a.property('result').that.is.an('array');
    })
    it(`Should have a success message`, () => {
        expect(response.body).to.have.a.property('message').that.equals('Products retrieved successfully!');
    })
});