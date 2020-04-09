const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    secret_friend: {
      type: mongoose.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Friends", FriendSchema);
