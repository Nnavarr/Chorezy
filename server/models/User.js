const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
    // tag to differentiate admin from child
    admin: {
      type: Boolean,
      required: false
    },
    // reference for child schema
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    // tasks the user created, or assigned (if child)
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task'
      }
    ],
    // populate any assigned tasks
    assignments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
      }
    ]
  },
  {
    toJSON: {}
  }
);

// set presave middleware to ocreate password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
})

// compare incoming password with the hashed pw
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);
module.exports = User;
