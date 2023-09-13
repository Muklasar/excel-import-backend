const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const orderSchema = mongoose.Schema(
  {
    tracking_id: {
      type: String,
      required: true,
    },
    order_id: {
      type: String,
      required: true,
    },
    uic: {
      type: String,
      required: true,
    },
    order_date: {
      type: String,
      required: true,
    },
    item_id: {
      type: String,
      required: true,
    },
    imei: {
      type: String,
      required: true,
    },
    grade: {
      type: ObjectId,
      ref: "Grad",
    },
    current_tray: {
      type: ObjectId,
      ref: "Tray",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
