const { Router } = require("express");

const FriendController = require("../app/Controllers/FriendController");

const routes = new Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Hello WOrld" });
});

routes.get("/friends", FriendController.index);
routes.get("/friends/:id", FriendController.show);
routes.post("/friends", FriendController.store);
routes.put("/friends/:id", FriendController.update);
routes.delete("/friends/:id", FriendController.destroy);

module.exports = routes;
