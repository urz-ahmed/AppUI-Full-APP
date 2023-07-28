const mongoose = require('mongoose')
// Define the testcase schema
const testcaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
})

// Define the question schema
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // testcases: {
  //   type: [testcaseSchema],
  //   required: true,
  // },
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
  complexity: {
    type: String,
    required: true,
  },
  toughness: {
    type: String,
    required: true,
  },
  tags:{
    type: [String],
    required: true,
  },
  acceptance: {
    type: String,
    default: false,
  },
  frequency: {
    type: Number,
    default: 0,
  },
  // solution: {
  //   type: String,
  //   required: true,
  // },
    
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
