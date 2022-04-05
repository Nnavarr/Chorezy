const { AuthenticationError } = require('apollo-server-express');
const { User, Task } = require('../models');

const resolvers = {
  Query: {
    // TODO: Add authentication
  //   me: async (parent, args) => {
  //     const userData = await User.findONe()
  //   }
  // }

    users: async () => {
      return User.find()
        .select('-__v -password')
    }
  }
}

module.exports = resolvers;