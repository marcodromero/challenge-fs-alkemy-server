const Balance = require("../models/balance");
const sequelize = require("sequelize");

class BalanceService{
    getAllBalance = async (id) =>{
        const balance = await Balance.findAll({
            where: {
            userId: id,
            },
            attributes: [
            "id",
            "amount",
            [sequelize.fn("date_format", sequelize.col("date"), "%d-%m-%Y"), "date"],
            ],
            limit: 10,
            order: [["id", "DESC"]],
        });
        return balance;
    }
}

module.exports = BalanceService;