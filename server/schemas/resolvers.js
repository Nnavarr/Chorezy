const { AuthenticationError } = require('apollo-server-express');

const { User, Task, Child } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // TODO: Add authentication
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('children')
          .populate('tasks');
    
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    },

    // find all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('children')
        .populate('tasks')
    },

    // child query
    children: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Child.find(params)
    },
      // get a child by username
      children: async (parent, { username }) => {
        return User.findOne({ username })
          .select("-__v -password")
          .populate("tasks")
      },

  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(user);
        return { token, user };
      },
}
};

module.exports = resolvers;