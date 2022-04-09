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

        throw new AuthenticationError('You need to be logged in!');
      },

      // task related resolvers
      addTask: async (parent, args, context) => {
        if (context.user) {
          // create a new Task in the Task model
          const task = await Task.create({ ...args, username: context.user.username });
          
          // update the User model for user specific Tasks
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: {tasks: task._id } },
            { new: true }
          );
          return task
        }

        throw new AuthenticationError('You need to be logged in!');
      },

      // remove task from list of tasks to be assigned
      removeTask: async (parent, { taskId }, context) => {
        if (context.user) {
          const task = await Task.findByIdAndDelete({ _id: taskId })
          return task
        } else {
          throw new AuthenticationError('You need to be logged in!');
        }
      },

      // assign an existing task to a specific user
      assignTask: async (parent, { childId, taskId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: childId },
            { $addToSet: { tasks: taskId, completed: false }},
            { new: true }
            // only need to populate tasks since it's a child user
          ).populate('tasks')
          return updatedUser
        }
      }
  }
};

module.exports = resolvers;
