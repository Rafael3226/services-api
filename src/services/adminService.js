const { BadRequestError } = require("../errors");
const { sequelize, Profile } = require("../model");

const errorMessages = {
  dateError: "Start date cannot be later than end date",
};
module.exports.errorMessages = errorMessages;

module.exports.getBestProfession = async ({ start, end }) => {
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

module.exports.getBestClient = async ({ start, end, limit = 2 }) => {
  // Parse start and end dates as JavaScript Date objects
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (startDate > endDate) throw new BadRequestError(errorMessages.dateError);

  return await sequelize.transaction(async (transaction) => {
    return await sequelize.query(
      `SELECT Profiles.*, SUM(Jobs.price) as totalSpends FROM Profiles
       INNER JOIN Contracts ON Profiles.id = Contracts.ClientId
       INNER JOIN Jobs ON Contracts.id = Jobs.ContractId
       WHERE Jobs.paid = 1 
       AND paymentDate BETWEEN :start AND :end
       GROUP BY Profiles.id
       ORDER BY totalSpends DESC
       LIMIT :limit;`,
      {
        replacements: { start, end, limit },
        type: sequelize.QueryTypes.SELECT,
        transaction,
      }
    );
  });
};
