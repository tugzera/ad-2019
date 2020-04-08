const mongoose = require("mongoose");
const Friend = require("../Models/Friend");

class FriendController {
  async index(req, res) {
    const data = await Friend.find({});

    return res.json(data);
  }

  async show(req, res) {
    const id = req.params.id;
    const item = await Friend.findById(id);
    return res.json(item);
  }

  async store(req, res) {
    const data = await Friend.create(req.body);

    return res.json(data);
  }

  async update(req, res) {
    const id = req.params.id;
    const data = req.body;
    const item = await Friend.findByIdAndUpdate(
      id,
      { name: "jason bourne" },
      options,
      callback
    );
    return item;
  }

  async destroy(req, res) {
    const id = req.params.id;
    const item = await Friend.findByIdAndDelete(id);
  }
}

module.exports = new FriendController();
