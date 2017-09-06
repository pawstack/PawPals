const faker = require('faker');
const breeds = require('./sample_breeds');

faker.seed(4157); // to make sure fake data is the same on every seed
let dogs = [];

for (let i = 0; i < 201; i++) {
  const breed = faker.random.number(486);
  dogs.push({
    name: faker.name.firstName(),
    age: 1 + faker.random.number(10),
    weight: 5 + faker.random.number(120),
    breed: breeds[breed][0],
    profile_pic: breeds[breed][1],
    extras: faker.lorem.paragraph(),
    avg_rating: (3 + faker.random.number(1)) + '.' + (5 + faker.random.number(4)),
  });
}

module.exports = dogs;
