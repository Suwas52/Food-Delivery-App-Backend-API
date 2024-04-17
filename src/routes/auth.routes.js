const { Router } = require("express");
const { hash, compareSync } = require("bcryptjs");
const Model = require("../model");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const hashedPass = await hash(req.body.password, 10);
    const user = await Model.User.create({ ...req.body, password: hashedPass });
    return res
      .status(200)
      .json({ message: "User registered succesfully", user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Model.User.findOne({
      where: { email: req.body.email.toLowerCase() },
    });

    if (!user) return res.status(400).json({ message: "User not found!" });

    const isCorrect = compareSync(req.body.password, user.password);

    if (!isCorrect)
      return res.status(400).json({ message: "Password not matched" });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
    });

    res.status(200).json({
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
