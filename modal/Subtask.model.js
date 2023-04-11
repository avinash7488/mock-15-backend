const mongoose = require("mongoose");

const SubtaskSchema = mongoose.Schema(
    {
        title : String,
        isCompleted : Boolean,
        "taskID": { type: mongoose.Schema.Types.ObjectId, ref: 'task'}
    },
  {
    versionKey: false,
  }
);

const SubtaskModel = mongoose.model("subTask", SubtaskSchema);

module.exports = {
    SubtaskModel,
};