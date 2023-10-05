const {
  getBestProfession,
  getBestClient,
} = require("../services/adminService");

/**
 * Returns the profession that earned the most money (sum of jobs paid)
 * for any contactor that worked in the query time range.
 * @returns profession
 */
module.exports.getBestProfession = async (req, res, next) => {
  try {
    const { start, end } = req.query;
    const profession = await getBestProfession({ start, end });
    res.json(profession);
  } catch (error) {
    next(error);
  }
};

/**
 * returns the clients the paid the most for jobs in the query time period.
 * limit query parameter should be applied, default limit is 2.
 * @returns client
 */
module.exports.getBestClient = async (req, res, next) => {
  try {
    const { start, end, limit } = req.query;
    const clients = await getBestClient({ start, end, limit });
    res.json(clients);
  } catch (error) {
    next(error);
  }
};
