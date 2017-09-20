const expect = require('chai').expect;
const model = require('../../db/models');
const dbUtils = require('../../db/lib/utils.js');

  describe('Message Model', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able to retrieve data', function (done) {
    model.Message.fetchAll()
      .then(function (results) {
        expect(results.length).to.equal(0);
        done();
      })
      .catch(function (err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });
});
