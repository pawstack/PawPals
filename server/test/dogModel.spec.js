const expect = require('chai').expect;
const model = require('../../db/models');
const dbUtils = require('../../db/lib/utils.js');

describe('Dog Model', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able to retrieve data', function (done) {
    model.Dog.fetchAll()
      .then(function (results) {
        expect(results.length).to.equal(200);
        expect(results.at(0).get('id')).to.equal(1);
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  it('Should be able to find related owner', function(done) {
    model.Dog.where({'id': 1}).fetch({withRelated: ['owner']})
      .then((dog) => {
        expect(dog.relations.owner).to.be.an('object');
        expect(dog.relations.owner.id).to.have.equal(1);
        done();
      })
      .catch((err) => {
        done(err);
      })
  });
});
