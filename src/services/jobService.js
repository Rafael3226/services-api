const { Op } = require("sequelize");
const { Job, Contract, Profile, sequelize } = require("../model");
const {
  NotFoundError,
  PaymentRequiredError,
  BadRequestError,
} = require("../errors");

const jobMessages = {
  notFound: "Job(s) not found",
  alreadyPaid: "Job already paid",
  insufficientBalance: "Insufficient balance",
};
module.exports.jobMessages = jobMessages;

module.exports.getUnpaidJobs = async ({ profileId }) => {
  return sequelize.transaction(async (transaction) => {
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
      transaction,
    });
    if (jobs.length === 0) throw new NotFoundError(jobMessages.notFound);
    return jobs;
  });
};

module.exports.payJob = async ({ id, ClientId }) => {
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

    if (!job) throw new NotFoundError(jobMessages.notFound);
    if (job.paid) throw new BadRequestError(jobMessages.alreadyPaid);

    const client = job.Contract.Client;
    const contractor = job.Contract.Contractor;

    // Check if the client has enough balance to pay for the job
    if (client.balance < job.price)
      throw new PaymentRequiredError(jobMessages.insufficientBalance);

    client.balance -= job.price;
    contractor.balance += job.price;
    job.paid = true;
    job.paymentDate = new Date();

    // Save the updated client, contractor, and job records within the transaction
    await client.save({ transaction });
    await contractor.save({ transaction });
    await job.save({ transaction });

    return {
      id: job.id,
      description: job.description,
      price: job.price,
      paid: job.paid,
      paymentDate: job.paymentDate,
      contractId: job.contractId,
      client: { balance: client.balance },
    };
  });
};
