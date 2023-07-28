
const express = require('express')
const router = express.Router()
const Question = require('../models/Question')
const Submission = require('../models/Submition')
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken')

// Retrieve all questions
router.get('/questions', async (req, res) => {
  try {
    const { name, toughness } = req.query
    let query = {}

    if (name) {
      query.title = { $regex: name, $options: 'i' }
    }

    if (toughness) {
      query.toughness = { $in: toughness }
    }

    let questions

    if (Object.keys(query).length === 0) {
      // No query parameters provided, return all data
      questions = await Question.find()
    } else {
      // Query parameters provided, filter based on query
      questions = await Question.find(query)
    }

    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// post all questions
router.post('/questions', async (req, res) => {
  const {
    title,
    description,
    input,
    expectedOutput,
    complexity,
    Toughness: toughness,
    tags,
    acceptance,
    frequency,
    // solution,
  } = req.body

  const question = new Question({
    title,
    description,
    input,
    expectedOutput,
    complexity,
    toughness,
    tags,
    acceptance,
    frequency,
    // solution,
  })
  console.log(question)

  try {
    const newQuestion = await question.save({ question })
    res.status(201).json(newQuestion)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// // Save a submission and update acceptance status
// router.post('/submissions', async (req, res) => {
//   const { username, questionId, answer } = req.body

//   try {
//     const question = await Question.findById(questionId)

//     if (!question) {
//       return res.status(404).json({ message: 'Question not found' })
//     }

//     const submission = new Submission({
//       username,
//       questionId,
//       answer,
//       score: 0, // Calculate the score based on the answer
//     })

//     // Check if the answer matches all test cases
//     const isAccepted = question.testcases.every((testcase) => {
//       const { input, output } = testcase
//       const answerMatchesTestCase = true /* Perform necessary checks on answer and testcase */

//       if (answerMatchesTestCase) {
//         // Update the score based on the test case's weightage
//         submission.score += 100 /* Assign weightage */
//       }

//       return answerMatchesTestCase
//     })

//     // Calculate the acceptance percentage
//     const acceptancePercentage = (submission.score / totalScore) * 100

//     submission.acceptance = isAccepted

//     await submission.save()
//     res.status(200).json(submission)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

module.exports = router
