const express = require("express");
const routes = require("./routes");
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
    mongoose.connect(db.uri, { useUnifiedTopology: true });
  }

  middleware() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
