const express = require("express");
const db = require("../database/db-config");
const cors = require("cors");
const { runSeeders } = require("../seeders");
const resError = require("../helpers/resError");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";
    this.paths = {
      operations: "/operations",
      balance: "/balance",
      login: "/login",
      categories: "/categories",
    };

    this.dbConnection();
    this.middlewares();
    this.routes();
    this.errors();
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
    this.app.use(this.paths.login, require("../routes/login"));
    this.app.use(this.paths.categories, require("../routes/categories"));
  }

  errors(){
    this.app.use((err, req, res, next)=>{
      console.log("datos",err,"fin datos");
      resError(res, err.statusCode, err.message);
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  }
}

module.exports = Server;
