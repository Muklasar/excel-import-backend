const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const gradSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      // required: "Grad name is required",
    },
    slug: {
      type: "String",
      unique: true,
      lowercase: true,
      index: true,
    },
    descriptions: {
      type: String,
      text: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grad", gradSchema);
