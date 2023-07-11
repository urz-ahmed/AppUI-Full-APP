const mongoose= require('mongoose')

// Define the submission schema
const submissionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
})

// Create the models
const Submission = mongoose.model('Submission', submissionSchema)

module.exports = Submission

