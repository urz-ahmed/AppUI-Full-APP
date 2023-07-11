const express = require('express')
const router = express.Router()
router.options('/login', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.status(200).end();
  });
  module.exports = router