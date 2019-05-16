const expect = require('chai').expect;
const assert = require('chai').assert;
const request = require('supertest');

var timeout = 300000;
var BASE_URL = process.env.NODE_URL || 'http://localhost:3000/api';

describe('Events Tests',  ()=> {
  
  it('Create Event  ', function (done) {
    this.timeout(timeout);
    
    request(BASE_URL)
      .post("/events")
      .send({ 
      "title": 'Hackathon',
      "description": 'Blockchain event',
      "location": 'Lahore',
      "color": '#8c2b0e',
      "start": new Date(),
      "end": new Date(),
      "lat": '51.508742',
      "long": '-01.508742' })
      .expect(302)  /// As I am redirecting to listing page so 302 otherwise we will test on 201 in case of creation
      .end(function (err, res) {
        if (err) console.error(res.body);

        

        done(err);
      });

  });


  it('Get Events', function (done) {
    this.timeout(timeout);
    
    request(BASE_URL)
      .get("/events")
      .expect(200)
      .end(function (err, res) {
        if (err) console.error(res.body);

        assert(res.body); 

        done(err);
      });

  });


});