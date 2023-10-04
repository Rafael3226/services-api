const { Op } = require("sequelize");
const { Job, Contract, Profile, sequelize } = require("../model");
const {
  NotFoundError,
  PaymentRequiredError,
  BadRequestError,
} = require("../errors");

module.exports.getUnpaidJobs = async function ({ profileId }) {
  const jobs = await Job.findAll({
    include: {
      model: Contract,
      attributes: ["ContractorId", "ClientId"],
      where: {
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      },
    },
    where: {
      paid: {
        [Op.not]: true,
      },
    },
  });

  return jobs;
};

module.exports.payJob = async function ({ id, ClientId }) {
  return sequelize.transaction(async (transaction) => {
    // Find the job by jobId and include its contract
    // and the associated client and contractor profiles
    const job = await Job.findOne({
      where: { id },
      include: [
        {
          model: Contract,
          include: [
            { model: Profile, as: "Client" },
            { model: Profile, as: "Contractor" },
          ],
          where: { ClientId },
        },
      ],
    });

    if (!job) throw new NotFoundError("Job not found");
    if (job.paid) throw new BadRequestError("Job already paid");

    const client = job.Contract.Client;
    const contractor = job.Contract.Contractor;

    // Check if the client has enough balance to pay for the job
    if (client.balance < job.price) {
      throw new PaymentRequiredError("Insufficient balance");
    }

    client.balance -= job.price;
    contractor.balance += job.price;
    job.paid = true;
    job.paymentDate = new Date();

    // Save the updated client, contractor, and job records within the transaction
    await client.save({ transaction });
    await contractor.save({ transaction });
    await job.save({ transaction });

    return {
      id,
      description: job.description,
      price: job.price,
      paid: job.paid,
      paymentDate: job.paymentDate,
      contractId: job.contractId,
      client: { balance: client.balance },
    };
  });
};
