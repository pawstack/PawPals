'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');

describe('getWalkersWalks', function() {
  //it('should fetch collection', function(done) {
    //request(app)
      //.get('/api/walks/fetch')
      //.expect(200)
      //.expect(function(res) {
        //expect(res.walks).to.exist;
      //})
      //.end(done);
  });

  it('accepts POST request', function(done) {
    request(app)
      .post('/api')
      .expect(201)
      .expect(function(res) {
        expect(res.body.data).to.equal('Posted!');
      })
      .end(done);
  });
});
