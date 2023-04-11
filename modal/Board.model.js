const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema(
    {
         "name": String,
         "userID":{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }
       },
  {
    versionKey: false,
  }
);

const BoardModel = mongoose.model("board", BoardSchema);

module.exports = {
  BoardModel,
};

