const { Schema, model } = require('mongoose');

// TODO: Add password encryption
const childSchema = new Schema(
  {
    username: {
      type: String,
      requried: true,
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
    age: {
      type: Number,
      required: true
    },
    // reference to parent user
    parent: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ]
  },
  {
    toJSON: {}
  }
);

const Child = model('Child', childSchema);
module.exports = Child;