const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
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
const validateGetMemberShipForm = [
  body("secret-code")
    .trim()
    .notEmpty()
    .withMessage("Secret code cannot be empty"),
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
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //Check admin access code if they enter it
    if (req.body["admin-access-code"].length > 0) {
      if (req.body["admin-access-code"] != process.env.ADMIN_CODE) {
        res.render("sign-up", { errors: [{ msg: "Incorrect Admin Code" }] });
        return;
      } else {
        //assigns user an admin if they enter correct access code
        await db.addAdmin(
          req.body["first-name"],
          req.body["last-name"],
          req.body.username,
          hashedPassword,
          "y"
        );
        res.redirect("/");
        return;
      }
    }
    await db.addUser(
      req.body["first-name"],
      req.body["last-name"],
      req.body.username,
      hashedPassword
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
const changeMemberShipStatusToAdminPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("get-membership", {
        error: ["Secret code cannot be empty"],
        user: req.user,
      });
    }
    if (req.body["secret-code"] == process.env.SECRET_CODE) {
      await db.changeMembershipStatusToAdmin(req.user.id);
      res.redirect("/");
      return;
    } else {
      res.render("get-membership", {
        error: ["Incorrect secret code"],
        user: req.user,
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
module.exports = {
  validateSignUpForm,
  addUserPost,
  validateGetMemberShipForm,
  changeMemberShipStatusToAdminPost,
};
