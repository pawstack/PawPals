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

  it('Should be able to fetch sender owner and walker details', function (done) {
    model.Message.forge({
      createdAt: new Date(),
      text: 'hello!',
      owner_id: '1',
      walker_id: '2',
      sender_id: '1'
    })
      .save()
      .then(function () {
        model.Message.where({'id': 1}).fetch({withRelated: ['walker', 'owner', 'sender']})
          .then((message) => {
            expect(message.relations.walker.id).to.equal(2);
            expect(message.relations.owner.id).to.equal(1);
            expect(message.relations.sender.id).to.equal(1);
            done();
          })
      })
      .catch(function (err) {
        done(err);
      });
  });
});
