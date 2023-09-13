const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const traySchema = mongoose.Schema(
  {
    id: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      text: true,
    },
    display_name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["ST", "CT"],
      required: true
    },
    limit: {
      type: Number,
    },
    grad: {
      type: ObjectId,
      ref: "Grad",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tray", traySchema);

// 1- Tray Id
// 2- Tray Name
// 3- Tray Display Name
// 4- Tray Type
// 5- Creation Date
// 6- Tray Limit
// 7- Tray Grade
