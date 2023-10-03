const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.get("/unpaid", jobController.getUnpaidJobs);

module.exports = router;
