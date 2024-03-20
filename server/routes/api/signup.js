const express = require("express");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  [
    body("username")
      .notEmpty()
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Username is Not valid!"),
    body("email")
      .notEmpty()
      .isEmail()
      .matches(
        /^(?!.*[._-]{2})(?!.*@\w*\d)(?!.*[@._-][^\w.-])[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/
      )
      .withMessage("Email is Not Valid!"),
    body("phone").isMobilePhone().withMessage("Invalid phone number"),
    body("role")
      .isIn(["super admin", "hr", "logistics", "comm", "regional manager"])
      .withMessage("Invalid role"),
    body("password")
      .notEmpty()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/)
      .withMessage(
        "Password should be combination of one uppercase , one lower case, one special character, one digit and min 8 , max 20 char long"
      ),
    body("confirmation").notEmpty(),
  ],
  async (req, res, next) => {
    passport.authenticate("signup", async (error, user, info) => {
      try {
        console.log("i'm here");

        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
          return res
            .status(400)
            .json({ inputValidationErrors: validationErrors.array() });
        }

        if (error) {
          return res.status(500).json({
            message: "Something is wrong in Registration",
            error: error || "internal server errror",
          });
        }

        req.login(user, async (error) => {
          if (error) {
            res.status(500).json({
              message: "Something is wrong",
              error: error || "internal server errror",
            });
          }

          return res.json({ user, info });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
);

module.exports = router;
