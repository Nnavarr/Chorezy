const { AuthenticationError } = require('apollo-server-express');

const { User, Task, Assignment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // TODO: Add authentication
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('children')
          .populate('tasks')
          .populate('assignments')
    
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    },

    // find specific user
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('children')
        .populate('tasks')
        .populate('assignments')
    },

    // find all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('children')
        .populate('tasks')
        .populate('assignments')
    },

    // tasks
    tasks: async () => {
      return Task.find()
        .select('-__v')
    },

    assignments: async () => {
      return Assignment.find()
        .select('-__v')
    }
  },
  
  Mutation: {
    addUser: async (parent, {username, email, password, admin}) => {
      const user = await User.create({ username, email, password, admin });
      const token = signToken(user);

      return { token, user };
    },

    removeUser: async (parent, {username}, context) => {
      if (context.user) {
        const user = await User.findOneAndDelete( {username: username });
        return user
      }
      throw new AuthenticationError('You need to be logged in!');
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

      // assign task
      // the task information will need to be extracted prior to running the mutation
      assignTask: async (parent, { username, taskId, taskName, taskValue }) => {
      
        // set completed to false and extract tasks value
        let completed = false;

        // add entry to master assignment model
        const assignment = await Assignment.create( 
          { username, taskId, taskName, taskValue, completed }
          )

        // update user's model
        await User.findOneAndUpdate(
          { username: username },
          { $push: { assignments: assignment._id} },
          { new: true }
        )

        return assignment
      },

      // remove assigned task
      removeAssignedTask: async (parent, { assignmentId }) => {
        const assignment = await Assignment.findByIdAndDelete({ _id: assignmentId })
        return assignment
      }

      // set task to complete

  }
};

module.exports = resolvers;