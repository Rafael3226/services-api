const { Op } = require("sequelize");

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

/**
 * Returns a list of contracts belonging to a user
 * (client or contractor), the list should only
 * contain non terminated contracts.
 * @returns list of contracts
 */
module.exports.getContracts = async (req, res) => {
  const { Contract } = req.app.get("models");
  const { id: profileId } = req.profile;

  const contract = await Contract.findAll({
    where: {
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      [Op.not]: [{ status: "terminated" }],
    },
  });

  if (contract.length === 0) return res.status(404).end();
  res.json(contract);
};
