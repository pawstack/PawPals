'use strict';
const request = require('supertest');
//const superagent = require('superagent');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');
const controller = require('../controllers/api.js');
var httpMocks = require('node-mocks-http');

describe('Walks API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(() => {
      done();
    })
  })
  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('should foo the bar', (done) => {
    var request  = httpMocks.createRequest({
      method: 'POST',
      url: '/api/walks/create',
      body: {
        session_start: new Date(),
        session_end: new Date(),
        walk_zone_pt: '944 Market St, San Francisco',
        price: 20,
        longitude: '122.4194',
        latitude: '37.7749'
      },
      user: {
        id: 1
      }
    });

    var response = httpMocks.createResponse();

    //controller.createWalk(request, response, );

    //console.log(response.json, 'data');
    //expect(res).to.be.equal({ foo: request.body.foo })
    done();
  })

  //it('/walks/create', function (done) {
  //agent.post('/api/walks/create')
  //.withCredentials()
  //.send({
  //session_start: new Date(),
  //session_end: new Date(),
  //walk_zone_pt: '944 Market St, San Francisco',
  //price: 20,
  //longitude: '122.4194',
  //latitude: '37.7749'
  //})
  //.end((err, res) => {
  //console.log(res, 'text****************');
  //console.log(err, 'error')
  //done();
  //})
  //})
})
