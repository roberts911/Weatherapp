const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const { expect } = chai;
chai.use(chaiHttp);

describe('GET /api/weather', () => {
  it('should return weather data', (done) => {
    chai
      .request('http://localhost:9000')
      .get('/api/weather?lat=60.17&lon=24.94')
      .end((err, res) => {
        if (err) {
          done(err); // Dodaj obsługę błędu
        } else {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('main');
          expect(res.body).to.have.property('description');
          expect(res.body).to.have.property('icon');
          expect(res.body).to.have.property('temp');
          expect(res.body).to.have.property('pressure');
          expect(res.body).to.have.property('feels_like');
          expect(res.body).to.have.property('humidity');
          expect(res.body).to.have.property('windSpeed');
          done();
        }
      });
  });
});

describe('GET /api/forecast', () => {
  it('should return forecast data', (done) => {
    chai
      .request('http://localhost:9000')
      .get('/api/forecast?lat=60.17&lon=24.94')
      .end((err, res) => {
        if (err) {
          done(err); // Dodaj obsługę błędu
        } else {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        }
      });
  });
});
