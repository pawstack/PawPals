const expect = require('chai').expect;
const models = require('../../db/models');
const dbUtils = require('../../db/lib/utils.js');

describe('Profile model tests', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

   //Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

});
