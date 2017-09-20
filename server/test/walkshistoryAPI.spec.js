'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

xdescribe('Walk History API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });
// Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to ...', function (done) {
    request(app)
      .get('fill in url')
      .expect(res => {
        res.body = {
        };
      })
      .expect(200, {
      })
      .end(done);
  });
});
