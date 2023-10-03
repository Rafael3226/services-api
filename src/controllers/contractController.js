/**
 * Returns the contract only if it belongs to the profile calling.
 * each contract belongs to the client who created it.
 * @returns contract by id
 */
module.exports.getContractById = async (req, res) => {
  const { Contract } = req.app.get("models");
  const { id: contractId } = req.params;
  const { id: profileId } = req.profile;

  const contract = await Contract.findOne({
    where: { ClientId: profileId, id: contractId },
  });

  if (!contract) return res.status(404).end();
  res.json(contract);
};
