const faker = require('faker');
const addresses = require('./sample_addresses');

faker.seed(16123); // to make sure fake data is the same on every seed
let users = [];

const millisecondsPerHour = 3600000;
const today = new Date();
today.setHours(0, 0, 0, 0);
const sessionLengthOptions = [30, 60, 90, 120];

const generateSessionDateTime = function() {
  let startEnd = [];
  let day = new Date(today);
  // randomize day in next month
  day.setDate(day.getDate() + faker.random.number(30));
  // randomize hour in day, between 8am-8pm
  startEnd[0] = new Date(day.getTime() + (8 + (faker.random.number(11)) * millisecondsPerHour));
  // randomize start stop time
  startEnd[1] = new Date(startEnd[0].getTime() + (sessionLengthOptions[faker.random.number(3)] * 1000 * 60));

  return startEnd;
};

let startEnd;
for (let i = 0; i < 500; i++) {
  startEnd = generateSessionDateTime();
  users.push({
    walk_zone_pt: addresses[faker.random.number(12000)],
    walk_zone_radius: faker.random.number(2) + 2,
    price: 20 + faker.random.number(30),
    session_start: startEnd[0],
    session_end: startEnd[1],
    walker_id: faker.random.number(200) 
  });
}

module.exports = users;
