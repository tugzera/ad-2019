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
    try {
      const data = req.body;
      const item = await Friend.create(data);
      return res.json(item);
    } catch (err) {
      res.status(501).json({ message: "Internal server Error." });
    }
  }

  async update(req, res) {
    try {
      const data = req.body;
      const { id } = req.params;
      const item = await Friend.findById(id);
      if (item) {
        item.name = data.name;
        item.email = data.email;
        item.secret_friend = data.secret_friend;
        await item.save();
        return res.json(item);
      }
      throw new Error();
    } catch (err) {
      return res.status(404).json({ message: "Document not found." });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const item = await Friend.findById(id);
      if (item) {
        await item.remove();
        return res.end();
      }
      throw new Error();
    } catch (err) {
      return res.status(404).json({ message: "Document not found." });
    }
  }
}

module.exports = new FriendController();
