const faker = require('faker');

// import connection and models
const db = require('../config/connection');
const { User, Task } = require('../models/index');

db.once('open', async() => {
  await Task.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];
  const childData = [];

  // create fake data for admin user
  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    const age = faker.random.number({max: 100});
    const admin = true
    const children = []

    // append to userData
    userData.push({ username, email, password, age, admin, children })
  } 

  const createdUsers = await User.collection.insertMany(userData);

  // // create children
  // const childData = []
  // for (let i = 0; i < 10; i += 1) {
  //   const randomUserIndex = Math.floor(Math.random() * userData.length);
  //   const { _id: userId } = userData[randomUserIndex];

  //   // establish child data
  //   const username = faker.internet.userName();
  //   const email = faker.internet.email(username);
  //   const password = faker.internet.password();
  //   const age = faker.random.number({max: 100});
  //   const admin = false
  //   const children = []

  //   User.updateOne({_id: userId}, {$push: {children: {username, email, password, age, admin, children }}})
  // }

  process.exit(0);
})