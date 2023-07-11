const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();


const jwtSecret = process.env.JWT_SECRET;

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) reject(err);
      resolve(userData);
    });
  });
}
router.get('/login', async (req, res) => {
  const token = req.cookies.token

  if (token) {
    const userData = await getUserDataFromReq(req);
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      try {
        const user = await User.findById(userData.id);
        if (!user) {
          // User not found in the database
          // console.log("User not found");
          res.status(404).json({ message: "User not found" });
          return;
        }

        const { username, email, _id } = user;
        res.status(200).json({ token,username, email, _id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } else {
    res.json(null);
  }
});



// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const userDoc = await User.findOne({ email });
//     if (userDoc) {
//       const passOk = await bcrypt.compare(password, userDoc.password);
//       if (passOk) {
//         jwt.sign(
//           { email: userDoc.email, id: userDoc._id },
//           jwtSecret,
//           {},
//           (err, token) => {
//             if (err) throw err;
//             res.cookie('token', token).json(userDoc);
//           }
//         );
//       } else {
//         res.status(401).send('Invalid password');
//       }
//     } else {
//       res.status(401).json({ message: 'SignUp Page' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });
router.post('/login', async (req, res) => {
  console.log("here")
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = await bcrypt.compare(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({ user: {id: userDoc._id,username: userDoc.username,email: userDoc.email,  }, token });
          }
        );
      } else {
    res.status(401).json({ message: 'Invalid password'});
      }
    } else {
      res.status(401).json({ message: 'SignUp Page' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});
module.exports = router;
