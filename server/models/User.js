const { Schema, model } = require('mongoose');
// const brcrypt = require('brcrypt');

// TODO: Add password encryption
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    // age to be used in filtering assignable tasks
    age : {
      type: Number,
      required: true
    },
    // tag to differentiate admin from child
    admin: {
      type: Boolean,
      required: true
    },
    // reference for child schema
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    // tasks assigned to the user
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task'
      }
    ]
  },
  {
    toJSON: {}
  }
);

const User = model('User', userSchema);
module.exports = User;

