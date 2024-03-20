const express = require("express");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .matches(
        /^(?!.*[._-]{2})(?!.*@\w*\d)(?!.*[@._-][^\w.-])[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/
      )
      .withMessage("Email is Not Valid!"),
    body("password")
      .notEmpty()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/)
      .withMessage(
        "Password should be combination of one uppercase , one lower case, one special character, one digit and min 8 , max 20 char long"
      ),
  ],
  async (req, res, next) => {
    passport.authenticate("login", async (error, user, info) => {
      try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
          return res
            .status(400)
            .json({ inputValidationErrors: validationErrors.array() });
        }

        if (error) {
          return res.status(500).json({
            message: "Something is wrong logging in",
            error: error || "internal server errror",
          });
        }

        //req.login is provided by passport to serilize user id
        req.login(user, async (error) => {
          if (error) {
            res.status(500).json({
              message: "Something is wrong logging in",
              error: error || "internal server errror",
            });
          }

          return res.send({ user, info });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
);

module.exports = router;
