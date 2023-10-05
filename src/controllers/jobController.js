const { getUnpaidJobs, payJob } = require("../services/jobService");
/**
 * Get all unpaid jobs for a user
 * (either a client or contractor),
 * for active contracts only.
 * @returns upaid jobs list
 */
module.exports.getUnpaidJobs = async (req, res, next) => {
  try {
    const { id: profileId } = req.profile;
    const jobs = await getUnpaidJobs({ profileId });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

/**
 * Pay for a job, a client can only pay if his balance >= the amount to pay.
 * The amount should be moved from the client's balance to the contractor balance.
 * @returns upaid jobs list
 */
module.exports.payJob = async (req, res, next) => {
  try {
    const { id: ClientId } = req.profile;
    const { job_id: id } = req.params;
    const job = await payJob({ id, ClientId });
    res.json(job);
  } catch (error) {
    next(error);
  }
};
