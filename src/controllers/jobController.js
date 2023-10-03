const { Op } = require("sequelize");

/**
 * Get all unpaid jobs for a user
 * (either a client or contractor),
 * for active contracts only.
 * @returns upaid jobs list
 */
module.exports.getUnpaidJobs = async (req, res) => {
  const { Job, Contract } = req.app.get("models");
  const { id: profileId } = req.profile;

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
  if (jobs.length === 0) return res.status(404).end();
  res.json(jobs);
};
