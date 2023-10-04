const { getBestProfession } = require("../services/adminService");

/**
 * Returns the profession that earned the most money (sum of jobs paid)
 * for any contactor that worked in the query time range.
 * @returns profession
 */
module.exports.getBestProfession = async (req, res) => {
  try {
    const { start, end } = req.query;
    const profession = await getBestProfession({ start, end });
    res.json(profession);
  } catch (error) {
    const errorOjb = { error: { message: error.message, ...error } };
    res.status(error.code || 500).json(errorOjb);
  }
};
