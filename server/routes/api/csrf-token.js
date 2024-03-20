const express = require("express");
const router = express.Router();

// Route to fetch CSRF token
router.get("/get-csrf-token", (req, res) => {
  // CSRF token is available in the request object
  const csrfToken = req.csrfToken();
  res.json({ csrfToken });
});

module.exports = router;
