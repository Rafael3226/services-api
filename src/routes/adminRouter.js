const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/best-profession", adminController.getBestProfession);

module.exports = router;
