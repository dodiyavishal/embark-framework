const { faker } = require('@faker-js/faker');

function generateUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    fullName: faker.person.fullName({ firstName, lastName }),
    username: `${firstName}${lastName}`.toLowerCase(),
    email: faker.internet.email({ firstName, lastName }),
    password: faker.internet.password(),
    location: `${faker.location.city()}, ${faker.location.state()}, ${faker.location.country()}`
  };
}

module.exports = { generateUser };