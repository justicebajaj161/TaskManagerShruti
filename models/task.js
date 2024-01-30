// models/task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  
  description: {
    type: String,
    trim: true
  },
  dueDate: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'completed'],
    default: 'to-do'
  },
  historyLogs: {
    type: [String], // Array of strings (logs)
    default: [],    // Default to an empty array
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
