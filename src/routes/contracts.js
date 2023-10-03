const express = require("express");
const router = express.Router();

/**
 * Returns the contract only if it belongs to the profile calling.
 * each contract belongs to the client who created it.
 * @returns contract by id
 */
router.get("/:id", async (req, res) => {
  const { Contract } = req.app.get("models");
  const { id: contractId } = req.params;
  const { id: profileId } = req.profile;

  console.debug(contractId, profileId);

  const contract = await Contract.findOne({
    where: { ClientId: profileId, id: contractId },
  });

  if (!contract) return res.status(404).end();
  res.json(contract);
});

// Export the router
module.exports = router;
