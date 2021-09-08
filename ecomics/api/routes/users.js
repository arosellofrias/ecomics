const express = require("express");
const router = express.Router();
const {User} = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { nombre, apellido, email, fechaDeNacimiento, direccion, password } = req.body;

    // Validate user input
    if (!(nombre && apellido && email && fechaDeNacimiento && direccion && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ where: { email:email.toLowerCase() } });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      nombre:nombre,
      apellido:apellido,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      fechaDeNacimiento:fechaDeNacimiento,
      direccion:direccion,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, "asdasd", {
      expiresIn: "2h",
    });
    // save user token
    user.token = token;
    console.log("token", user.token);
    //res.cookie("jwt", token, {httpOnly: true, maxAge: 50000}) // de video

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ where: { email:email.toLowerCase() } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, "asdasd", {
        expiresIn: "2h",
      });

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    //res.status(400).send("Invalid Credentials");  //esto rompe jaja
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router;
