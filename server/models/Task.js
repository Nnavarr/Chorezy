const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    // TODO: determine whether we should create an individual table
    // task category
    category: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    // association for user who created the task
    username: {
      type: String,
      required: true
    }
  },
  {
    toJson: {
      virtuals: true
    }
  }
)

const Task = model('Task', taskSchema);
module.exports = Task;
