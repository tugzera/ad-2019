const { Router } = require("express");

const HamburgerController = require("../app/Controllers/FriendController");

const routes = new Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Hello WOrld" });
});

routes.get("/hamburger", HamburgerController.index);

routes.post("/hamburger", HamburgerController.store);

module.exports = routes;
