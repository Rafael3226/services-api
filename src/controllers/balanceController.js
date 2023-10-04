const { depositMoney } = require("../services/balanceService");

/**
 *  Deposits money into the balance of a client,
 *  a client can't deposit more than 25% his total of
 *  jobs to pay. (at the deposit moment)
 * @returns new balance
 */
module.exports.depositMoney = async (req, res) => {
  // const { id: senderId } = req.profile;
  const { userId } = req.params;
  const { amount } = req.body;
  try {
    const balance = await depositMoney({ userId, amount });
    res.json(balance);
  } catch (error) {
    const errorOjb = { error: { message: error.message, ...error } };
    res.status(error.code || 500).json(errorOjb);
  }
};
