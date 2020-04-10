const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const db = require("../database/config");
const mongoose = require("mongoose");

class App {
  constructor() {
    this.server = express();

    this.database();

    this.middleware();

    this.routes();
  }

  database() {
    mongoose.connect(db.uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "*" }));
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
