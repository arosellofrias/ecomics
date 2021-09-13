const express = require("express");
const router = express.Router();
const { User, Cart } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

router.post("/register", async (req, res) => {
  try {
    const { nombre, apellido, email, direccion, password, privilegios } =
      req.body;

    if (
      !(
        nombre &&
        apellido &&
        email &&
        direccion &&
        password
      )
    ) {
      res.status(400).send("Por favor, ingrese todos los datos requeridos.");
    }

    if (!validateEmail(email))
      res.status(400).send("Por favor, ingrese un email válido.");

    const oldUser = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (oldUser) {
      return res.status(409).send("El email ya se encuentra en uso.");
    }

    // CHECKEAR EL SALT ! . ES SIEMPRE EL MISMO !!!

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      nombre: nombre,
      apellido: apellido,
      email: email.toLowerCase(),
      direccion: direccion,
      password: encryptedPassword,
      privilegios: privilegios
    });

    const cart = await User.findByPk(user.id).then((u) => {
      console.log(u);
      Cart.create({ userId: u.id }).then(() => {
        res.end();
      });
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
});

router.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;

    
    if (!(email && password)) {
      res.status(400).send("Ingrese email y contraseña válidos");
    }

    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, "asdasd", {
        expiresIn: "2h",
      });

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    } else res.status(400).send("Email o contraseña incorrectos."); //esto rompe jaja
  } catch (err) {
    console.log(err);
  }

});
router.get("/logout", (req, res, next) => {
  res.send({});
});


router.put("/:id", async (req, res, next) =>{
  const id = req.params.id
  let {password} = req.body

  if(password){
    password = await bcrypt.hash(password, 10)
    
    User.update({password : password},
      {where: {id: id},
      returning: true,
      plain: true
  }).then(data =>{
    return res.json(data[1])
  })
  }else{
    User.update(req.body,
      {where: {id: id},
      returning: true,
      plain: true
  }).then(data =>{
    res.json(data[1])
  })
  }
})

module.exports = router;
