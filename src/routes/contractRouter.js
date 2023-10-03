const express = require("express");
const router = express.Router();
const contractController = require("../controllers/contractController");

router.get("/:id", contractController.getContractById);
router.get("/", contractController.getContracts);

module.exports = router;
