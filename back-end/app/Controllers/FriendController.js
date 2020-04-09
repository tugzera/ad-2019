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
    const data = req.body;
    await Friend.findOneAndUpdate({ _id: req.params.id }, data, (err, item) => {
      res.send(item);
    });
  }

  async destroy(req, res) {
    const id = req.params.id;
    await Friend.findByIdAndRemove(id, {}, (err, item) => {
      if (item) {
        return res.status(200).send({
          message: "Item successfully deleted",
        });
      }

     return res.status(404).send("Not Found");
    });
  }
}

module.exports = new FriendController();
