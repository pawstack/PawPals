const faker = require('faker');
const addresses = require('./sample_addresses');
const stripe = require('./sample_stripe');

faker.seed(16123); // to make sure fake data is the same on every seed
let users = [];

for (let i = 0; i < 200; i++) {
  const first = faker.name.firstName();
  const last = faker.name.lastName();
  const isWalker = faker.random.boolean();
  const stripeAcct = stripe[faker.random.number(stripe.length - 1)];
  users.push({
    first: first,
    last: last,
    display: first + ' ' + last,
    email: faker.internet.exampleEmail(),
    phone: faker.phone.phoneNumberFormat(),
    profile_pic: faker.image.avatar(),
    about_me: faker.lorem.paragraph(),
    avg_walker_rating: (3 + faker.random.number(1)) + '.' + (5 + faker.random.number(4)),
    address: addresses[faker.random.number(addresses.length - 1)], // cannot use faker.address as real addresses are required, easier for testing if in the same area as well
    walker: isWalker,
    owner: !isWalker,
    stripe_user_id: stripeAcct[0],
    customer_id_cc_Token: stripeAcct[1]
  });
}

module.exports = users;
