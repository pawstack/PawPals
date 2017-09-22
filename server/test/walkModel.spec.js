const expect = require('chai').expect;
const model = require('../../db/models');
const dbUtils = require('../../db/lib/utils.js');

describe('Walk Model', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able to retrieve walks', function (done) {
    model.Walk.fetchAll()
      .then(function (results) {
        expect(results.length).to.equal(500);
        expect(results.at(0).get('id')).to.equal(1);
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  it ('Should be able to fetch related data', function(done) {
    model.Walk.where({'id': 1}).save({'owner_id': 1, 'dog_id': 1}, {method: 'update'})
      .then(() => {
        model.Walk.where({'id': 1}).fetch({withRelated: ['walker', 'owner', 'dog']})
          .then((walk) => {
            expect(walk.relations.walker).to.exist;
            expect(walk.relations.owner.id).to.equal(1);
            expect(walk.relations.dog.id).to.equal(1);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
  });
});
