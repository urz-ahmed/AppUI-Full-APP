const express = require('express');
const bardapi = require('@xelcior/bard-api');
const router = express.Router();

const _bard = new bardapi(process.env.CHAT_API_TOKEN);

router.get('/test-bard', (req, res) => {
  res.json({ message: 'Test route for bard is working' });
});

router.post('/get-answer', async (req, res) => {
  try {
    const userQuestion = req.body.question;

    if (userQuestion) {
      const answer = await _bard.getAnswer(userQuestion);
      res.status(200).json({ answer });
    } else {
      res.status(400).json({ error: 'Question not provided' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred', details: error.toString() });
  }
});

module.exports = router;
