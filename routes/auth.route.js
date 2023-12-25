const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { SECRETKEY } = process.env;

router.get("/", (req, res) => {
  res.json({ message: "Welcome to authentication!!" });
});


// Login 
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password." });
  }
  const token = jwt.sign(
    { id: user.id, username, name: user.name },
    SECRETKEY,
    { expiresIn: "1h" }
  );
  return res.json({ token });
});

// Sign up
router.post('/signup', async (req, res) => {
    data = req.body;

    // Duplicate user
    const existingUser = await User.findOne({ username: data.username });
    if(existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    userID = await nextID();

    userData = new User({
        id: userID,
        name: data.name,
        username: data.username,
        password: data.password
    })

    userData.save();

    return res.status(201).json({ message: 'Signup successfully!!' });
})


const nextID = async function () {
    try {
      maxID = await User.findOne({}).sort({ id: -1 });
      if (maxID) {
        return maxID.id + 1;
      }
      return 1;
    } catch (err) {
      console.error(err);
    }
  };


module.exports = router;
