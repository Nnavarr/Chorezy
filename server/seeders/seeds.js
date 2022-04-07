const faker = require('faker');

// import connection and models
const db = require('../config/connection');
const { User, Task } = require('../models/index');

db.once('open', async() => {
  await Task.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  // create fake data for admin user
  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    const age = faker.random.number({max: 100});
    const admin = true;
    const children = [];
    const tasks = [];

    // append to userData
    userData.push({ username, email, password, age, admin, children, tasks })
  } 

  // insert users to model
  await User.collection.insertMany(userData);

  // create children
  for (let i = 0; i < 10; i += 1) {
    // randomly select user to have children added (User)
    const randomUserIndex = Math.floor(Math.random() * userData.length);
    const { _id: userId } = userData[randomUserIndex];

    // convert userId to childId
    let childId = userId; 

    // catch for matching userId and childId (try another random number)
    while (childId === userId) {
      const randomUserIndex = Math.floor(Math.random() * userData.length);
      childId = userData[randomUserIndex]
    }

    // append child to User & update admin to false
    await User.updateOne({ _id: userId }, {$addToSet: { children: childId }});
    await User.updateOne({ _id: userId }, {admin: false});
  }
  
  process.exit(0);
})

