const faker = require('faker');

// import connection and models
const db = require('../config/connection');
const { User, Task, Child } = require('../models/index');

db.once('open', async() => {
  await Task.deleteMany({});
  await User.deleteMany({});
  await Child.deleteMany({});

  // create user data
  const userData = [];

  // create fake data for admin user
  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    const age = faker.random.number({max: 100});
    const children = []

    // append to userData
    userData.push({ username, email, password, age, children })
  } 

  // insert users to model
  await User.collection.insertMany(userData);

  // create child data
  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    const age = faker.random.number({max: 100});

    // find parent at random 
    const randomIndex = Math.floor(Math.random() * userData.length);
    console.log(randomIndex)
    const { _id: userId } = userData[randomIndex];
    const parent = userId

    // append child to parent
    const createdChild = await Child.create({ username, email, password, age, parent });

    await User.updateOne(
      { _id: userId },
      { $push: { children: createdChild }}
    )
  }

  process.exit(0);
})

