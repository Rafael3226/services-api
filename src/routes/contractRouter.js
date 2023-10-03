const express = require("express");
const router = express.Router();
const { getContractById } = require("../controllers/contractController");

router.get("/:id", getContractById);

module.exports = router;
