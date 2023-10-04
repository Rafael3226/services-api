const { BadRequestError } = require("../errors");
const { sequelize, Job, Contract, Profile } = require("../model");

const errorMessages = {
  amountNotNegative: "Deposit amoun can not be negative or 0.",
  notUnpaidJobs:
    "Is not posible to complete the deposit because there are not unpaid jobs",
  amountOverLimint:
    "Client can't deposit more than 25% of his total unpaid jobs.",
};
module.exports.errorMessages = errorMessages;

module.exports.depositMoney = async function ({ userId, amount }) {
  if (amount <= 0) throw new BadRequestError(errorMessages.amountNotNegative);
  return sequelize.transaction(async (transaction) => {
    const unpaidJobs = await Job.findAll({
      where: { paid: true },
      include: [
        {
          model: Contract,
          include: [{ model: Profile, as: "Client" }],
          where: { ClientId: userId },
        },
      ],
      transaction,
    });
    if (unpaidJobs.length === 0)
      throw new BadRequestError(errorMessages.notUnpaidJobs);

    const totalUnpaidJobs = unpaidJobs.reduce((acc, job) => acc + job.price, 0);

    if (amount > totalUnpaidJobs * 0.25)
      throw new BadRequestError(errorMessages.amountOverLimint);

    const client = unpaidJobs[0].Contract.Client;
    client.balance += amount;

    return await client.save({ transaction });
  });
};
