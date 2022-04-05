// const faker = require('faker');

// // import connection and models
// const db = require('../config/connection');
// const { User, Task } = require('../models/index');

// db.once('open', async() => {
//   await Task.deleteMany({});
//   await User.deleteMany({});

//   // create user data
//   const userData = [];

//   // create faker data
//   for (let i = 0; i < 50; i += 1) {
//     const username = faker.internet.username();
//     const email = faker.internet.email();
//     const password = faker.internet.password();
//     const age = faker.random.number({max: 100});
//     const admin = true
//     const child = []

//     // append to userData
//     userData.push({ username, email, password, age, admin, child })
//   } 

//   process.exit(0);
// })