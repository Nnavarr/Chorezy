const { Schema } = require('mongoose');
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
    // categiry for whether the user is an admin (parent) or user (child)
    type: {
        type: Boolean,
        required: true
    },
    // self reference for child users associated with an admin (if applicable)
    child: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
    }
  }
);

const User = model('User', userSchema);
module.exports = User;
