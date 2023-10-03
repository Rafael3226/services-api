const express = require("express");
const router = express.Router();
const contractController = require("../controllers/contractsController");

router.get("/:id", contractController.getContractById);

module.exports = router;
