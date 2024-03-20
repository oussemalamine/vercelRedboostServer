const mongoose = require("mongoose");

// Single Admin Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => /^[a-zA-Z\s]+$/.test(value),
      message: "Username is not valid!",
    },
  },

  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) =>
        /^(?!.*[._-]{2})(?!.*@\w*\d)(?!.*[@._-][^\w.-])[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(
          value
        ),
      message: "Email is not valid!",
    },
  },

  phone: {
    type: String,
    unique: true,
    validate: {
      validator: (value) => /^[0-9]+$/.test(value), // Adjust the regex according to your phone number format
      message: "Invalid phone number",
    },
  },

  role: {
    String,
    enum: ["super admin", "hr", "logistics", "comm", "regional manager"],
  },

  password: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/.test(
          value
        ),
      message:
        "Password should be a combination 8 characters or + , Should include one Uppercase, one lowercase, one special character and one number",
    },
  },

  confirmation: {
    type: String,
    unique: true,
    required: true,
  },

  validation: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
