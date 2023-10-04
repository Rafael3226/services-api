const {
  getContractById,
  getContracts,
} = require("../services/contractService");

/**
 * Returns the contract only if it belongs to the profile calling.
 * each contract belongs to the client who created it.
 * @returns contract by id
 */
module.exports.getContractById = async (req, res) => {
  const { id } = req.params;
  const { id: ClientId } = req.profile;
  try {
    const contract = await getContractById({ id, ClientId });
    res.json(contract);
  } catch (error) {
    const errorOjb = { error: { message: error.message, ...error } };
    res.status(error.code || 500).json(errorOjb);
  }
};

/**
 * Returns a list of contracts belonging to a user
 * (client or contractor), the list should only
 * contain non terminated contracts.
 * @returns list of contracts
 */
module.exports.getContracts = async (req, res) => {
  const { id: profileId } = req.profile;
  try {
    const contracts = await getContracts({ profileId });
    res.json(contracts);
  } catch (error) {
    const errorOjb = { error: { message: error.message, ...error } };
    res.status(error.code || 500).json(errorOjb);
  }
};
