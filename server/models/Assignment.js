  const { Schema, model } = require('mongoose');

  const assignmentSchema = new Schema(
    {
      username: {
        type: String,
        required: true
      },

      taskId: {
        type: String,
        required: true
      },

      taskValue: {
        type: Number
      },

      completed: {
        type: Boolean
      }
    }
  )

  const Assignment = model('Assignment', assignmentSchema);
  module.exports = Assignment;