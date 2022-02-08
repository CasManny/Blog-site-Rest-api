const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
   title: {
       type: String,
       required: true,
       unique: true,
   },
   desc: {
       type: String,
       required: false,
   },
   username: {
       type: String,
       require: true,
   },
   categories: {
       type: Array,
       required: false,
   }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
