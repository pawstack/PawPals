const faker = require('faker');
const addresses = require('./sample_addresses');

faker.seed(16123); // to make sure fake data is the same on every seed
let users = [];

for (let i = 0; i < 200; i++) {
  const first = faker.name.firstName();
  const last = faker.name.lastName();
  users.push({
    first: first,
    last: last,
    display: first + ' ' + last,
    email: faker.internet.exampleEmail(),
    phone: faker.phone.phoneNumberFormat(),
    profile_pic: faker.image.avatar(),
    about_me: faker.lorem.paragraph(),
    avg_walker_rating: (3 + faker.random.number(1)) + '.' + (5 + faker.random.number(4)),
    address: addresses[faker.random.number(12000)], // cannot use faker.address as real addresses are required, easier for testing if in the same area as well
    walker: faker.random.boolean(),
    owner: faker.random.boolean()
  });
}
module.exports = users;
