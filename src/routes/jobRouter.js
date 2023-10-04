const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.get("/unpaid", jobController.getUnpaidJobs);
router.post("/:job_id/pay", jobController.payJob);

module.exports = router;
