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

    // tasks
    tasks: async () => {
      return Task.find()
        .select('-__v')
    }
  },
  
  Mutation: {
    addUser: async (parent, {username, email, password, admin}) => {
      console.log('addUser mutation...')
      const user = await User.create({ username, email, password, admin });
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

      addChild: async (parent, { childId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { children: childId } },
            { new: true }
          ).populate('children');
      
          return updatedUser;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },

      removeChild: async (parent, { childId }, context) => {
        if (context.user){
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { children: childId } },
            { new: true }
          ).populate('children');

          return updatedUser
        }
      },

      // task related resolvers
      addTask: async (parent, args, context) => {
        if (context.user) {
          const task = await Task.create(args);
          return task;
        }
      }
  }
};

module.exports = resolvers;