const { BadRequestError } = require("../errors");
const { sequelize, Profile } = require("../model");

const errorMessages = {
  dateError: "Start date cannot be later than end date",
};
module.exports.errorMessages = errorMessages;

module.exports.getBestProfession = async function ({ start, end }) {
  // Parse start and end dates as JavaScript Date objects
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (startDate > endDate) throw new BadRequestError(errorMessages.dateError);

  return sequelize.transaction(async (transaction) => {
    return await Profile.findOne({
      attributes: [
        "profession",
        [
          sequelize.literal(
            "(SELECT SUM(`price`) FROM `Jobs` WHERE `ContractId`" +
              " IN (SELECT `id` FROM `Contracts` WHERE `ContractorId` " +
              "= `Profile`.`id`) AND `paid` = 1 AND `paymentDate` BETWEEN ? AND ?)"
          ),
          "totalEarnings",
        ],
      ],
      replacements: [startDate, endDate], // Pass the replacements for the placeholders in the subquery
      group: ["Profile.profession"],
      order: [[sequelize.literal("totalEarnings"), "DESC"]],
      transaction,
    });
  });
};
