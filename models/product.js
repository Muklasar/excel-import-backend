const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    sr_no: {
      type: String,
    },
    uic: {
      type: String,
    },
    module_name: {
      type: String,
    },
    grade: {
      type: String,
    },
    tray_id: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
