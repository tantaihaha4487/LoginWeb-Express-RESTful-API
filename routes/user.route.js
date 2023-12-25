const express = require("express");
const router = express.Router();
User = require("../models/user.model");


router.get("/", (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({ error: err }).status(400);
    });
});


router.get("/id/:id", (req, res) => {
  userId = req.params.id;
  User.find({ id: userId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({ error: err }).status(400);
    });
});


router.get("/username/:username", (req, res) => {
  username = req.params.username;
  User.find({ username: username })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({ error: err }).status(400);
    });
});


router.post('/', async (req, res) => {
    data = req.body;
    userID = await nextID();

    userData = new User({
        id: userID,
        name: data.name,
        username: data.username,
        password: data.password
    })

    userData.save();

    res.json(userData).status(201);
});


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
