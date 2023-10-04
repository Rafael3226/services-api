const { Contract, sequelize } = require("../model");
const { NotFoundError } = require("../errors");
const { Op } = require("sequelize");

const contactMessages = {
  notFound: "The contract(s) was not found.",
};
module.exports.contactMessages = contactMessages;

module.exports.getContractById = async ({ ClientId, id }) => {
  return await sequelize.transaction(async (transaction) => {
    const contract = await Contract.findOne({
      where: { ClientId, id },
      transaction,
    });
    if (!contract) throw new NotFoundError(contactMessages.notFound);
    return contract;
  });
};

module.exports.getContracts = async ({ profileId }) => {
  const status = "terminated";
  return await sequelize.transaction(async (transaction) => {
    const contracts = await Contract.findAll({
      where: {
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
        [Op.not]: [{ status }],
      },
      transaction,
    });
    if (contracts.length === 0)
      throw new NotFoundError(contactMessages.notFound);
    return contracts;
  });
};
