const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateSignUpForm = [
  body("first-name")
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty."),
  body("last-name").trim().notEmpty().withMessage("Last name cannot be empty."),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  body("confirm-password")
    .trim()
    .notEmpty()
    .withMessage("Confirm password cannot be empty")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
];
const addUserPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", { errors: errors.array() });
    }
    const username = await db.searchUserByUsername(req.body.username);
    if (username.length > 0) {
      res.render("sign-up", { errors: [{ msg: "username already exists" }] });
      return;
    }
    await db.addUser(
      req.body["first-name"],
      req.body["last-name"],
      req.body.username,
      req.body.password
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
module.exports = {
  validateSignUpForm,
  addUserPost,
};
