const express = require("express");
require("dotenv").config();
const db = require("../database/db-config");
const cors = require("cors");
const { runSeeders } = require("../seeders");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";
    this.paths = {
      operations: "/operations",
      balance: "/balance",
      auth: "/auth",
      categories: "/categories",
    };

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      await db.sync({ force: false });
      runSeeders();
      console.log("Database online");
    } catch (error) {
      throw new Error(error);
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.operations, require("../routes/operations"));
    this.app.use(this.paths.balance, require("../routes/balance"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.categories, require("../routes/categories"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  }
}

module.exports = Server;
