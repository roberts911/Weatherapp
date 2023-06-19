// Import required modules for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const { expect } = chai;

// Use chaiHttp for making HTTP requests in tests
chai.use(chaiHttp);

// Test suite for '/api/weather' endpoint
describe('GET /api/weather', () => {
  // Test case: It should return weather data
  it('should return weather data', (done) => {
     // Make a GET request to the server
    chai
      .request('http://localhost:9000')
      .get('/api/weather?lat=60.17&lon=24.94')
      .end((err, res) => {
        if (err) {
          done(err); // Handle any error that occurred during the request
        } else {
          // Expectations for the server response
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
          done(); // Signal that the test case is done
        }
      });
  });
});

// Test suite for '/api/forecast' endpoint
describe('GET /api/forecast', () => {
  // Test case: It should return forecast data
  it('should return forecast data', (done) => {
    // Make a GET request to the server
    chai
      .request('http://localhost:9000')
      .get('/api/forecast?lat=60.17&lon=24.94')
      .end((err, res) => {
        if (err) {
          done(err); // Handle any error that occurred during the request
        } else {
          // Expectations for the server response
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done(); // Signal that the test case is done
        }
      });
  });
});
