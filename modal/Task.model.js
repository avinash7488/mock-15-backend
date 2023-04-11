const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
    {
           "title" : String,
           "description" : String,
           "status" : {type: String, enum: ['Todo', 'Doing', 'Done'], default: 'Todo'},
           "boardID" : { type: mongoose.Schema.Types.ObjectId, ref: 'board'}
    },
  {
    versionKey: false,
  }
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = {
  TaskModel,
};
