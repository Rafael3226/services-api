const { depositMoney } = require("../services/balanceService");

/**
 *  Deposits money into the balance of a client,
 *  a client can't deposit more than 25% his total of
 *  jobs to pay. (at the deposit moment)
 * @returns new balance
 */
module.exports.depositMoney = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;
    const balance = await depositMoney({ userId, amount });
    res.json(balance);
  } catch (error) {
    next(error);
  }
};
