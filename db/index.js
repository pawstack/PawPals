const knex = require('knex')(require('../knexfile'));
const db = require('bookshelf')(knex);

db.plugin('registry');

// var saveDog = function(req_body, req_user_id, callback) {

//   var dogToDB = new Promise(
//     (resolve, reject) => {
//       knex('dogs').insert({
//         name: req_body.name,
//         age: req_body.age,
//         weight: req_body.weight,
//         breed: req_body.breed,
//         extras: req_body.extras,
//         owner_id: req_user_id})
//         .then(resolve());
//     }
//   );

//   var ownerBoolToDB = new Promise(
//     (resolve, reject) => {
//       knex('profiles').where('id', req_user_id).update({owner: true})
//         .then(resolve());
//     }
//   );

//   var ownerPhoneToDB = new Promise(
//     (resolve, reject) => {
//       knex('profiles').where('id', req_user_id).update({phone: req_body.phone})
//         .then(resolve());
//     }
//   );

//   Promise.all([dogToDB, ownerBoolToDB, ownerPhoneToDB]).then(responses => {
//     callback();
//   })
//     .catch(e => {
//       console.log(e);
//     });

// };

// var saveWalker = function(req_body, req_user_id, callback) {
//   var extrasToDB = new Promise(
//     (resolve, reject) => {
//       knex('profiles').where('id', req_user_id).update({ about_me: req_body.extras})
//         .then(resolve());
//     }
//   );

//   var walkerBoolToDB = new Promise(
//     (resolve, reject) => {
//       knex('profiles').where('id', req_user_id).update({walker: true})
//         .then(resolve());
//     }
//   );

//   var walkerPhoneToDB = new Promise(
//     (resolve, reject) => {
//       knex('profiles').where('id', req_user_id).update({phone: req_body.phone})
//         .then(resolve());
//     }
//   );

//   Promise.all([extrasToDB, walkerBoolToDB, walkerPhoneToDB]).then(responses => {
//     callback();
//   })
//     .catch(e => {
//       console.log(e);
//     });
// };



module.exports = db;
// module.exports.saveDog = saveDog;
// module.exports.saveWalker = saveWalker;

