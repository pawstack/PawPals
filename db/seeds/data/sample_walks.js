const faker = require('faker');
const addresses = require('./sample_addresses');

faker.seed(16123); // to make sure fake data is the same on every seed
let users = [];

const millisecondsPerHour = 3600000;
const today = new Date();
today.setHours(0, 0, 0, 0);
const sessionLengthOptions = [60, 120, 240, 480];

const generateSessionDateTime = function() {
  let times = {};
  let day = new Date(today);
  // randomize day in next month
  day.setDate(day.getDate() + faker.random.number(30));
  // randomize hour in day, between 8am-8pm
  times.session_start = new Date(day.getTime() + ((6 + faker.random.number(16)) * millisecondsPerHour));
  // randomize start stop time
  times.session_end = new Date(times.session_start.getTime() + (sessionLengthOptions[faker.random.number(3)] * 1000 * 60));

  return times;
};

let times;
for (let i = 0; i < 500; i++) {
  times = generateSessionDateTime();
  const address = addresses[faker.random.number(addresses.length - 1)]; // cannot use faker.address as real addresses are required, easier for testing if in the same area as well  
  users.push({
    walk_zone_pt: address[0],
    walk_zone_radius: faker.random.number(2) + 2,
    latitude: address[1],
    longitude: address[2],
    price: 20 + faker.random.number(30),
    session_start: times.session_start,
    session_end: times.session_end,
    session_start_walker: times.session_start,
    session_end_walker: times.session_end,
    walker_id: 1 + faker.random.number(199) 
  });
}

module.exports = users;
