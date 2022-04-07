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
    let admin = true

    // if i is divisible by 2, set to admin to false (child)
    if (i % 2 == 0){
      admin = false
    }
    const children = [];
    const tasks = [];

    // append to userData
    userData.push({ username, email, password, age, admin, children, tasks })
  } 

  // insert users to model
  await User.collection.insertMany(userData);

  // pull all children 
  childUsers = await User.find({ admin: false });
  parentUsers = await User.find({ admin: true })

  for (child in childUsers) {
    // append children to random 
    const randomUserIndex = Math.floor(Math.random() * parentUsers.length);
    const { _id: userId } = parentUsers[randomUserIndex];
    await User.updateOne({ _id: userId }, { $addToSet: { children: childUsers[child]._id}})
  }

  process.exit(0);
})

