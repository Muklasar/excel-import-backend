const Tray = require("../models/Tray");
const Grad = require("../models/grad");
const slugify = require("slugify");
const Order = require("../models/order");

// create Tray
exports.create = async (req, res) => {
  const data = req.body;
  try {
    for (let i = 0; i < data.length; i++) {
      const {
        tracking_id,
        order_id,
        uic,
        current_tray,
        grade,
        order_date,
        item_id,
        imei,
      } = data[i];
      const grad = await Grad.findOne({ name: grade }).exec();
      const tray = await Tray.findOne({ id: current_tray }).exec();
      // const checkUIC = await Order.findOne({ uic: uic }).exec();
      // const checkTrackID = await Order.findOne({
      //   tracking_id: tracking_id,
      // }).exec();
      // const checkOrderID = await Order.findOne({ order_id: order_id }).exec();
      // console.log("checkUIC", checkUIC);
      // if (checkUIC || checkTrackID || checkOrderID) {
      //   res.json({ ok: false, message: "Please Remove Dublicate Value" });
      //   break
      // } 
      //   data[i].grade = grad._id;
      //   data[i].current_tray = tray._id;
      //   await new Order(data[i]).save();
      data[i].grade = grad._id;
      data[i].current_tray = tray._id;
      await new Order(data[i]).save();
      // console.log("tray", tray);
    }
    res.json({ ok: true, message: "Data Saves"});
  } catch (err) {
    res.status(400).send(err);
  }
};

// exports.gradChecker = async (req, res) => {
//   const { current_tray, grade, order_id, tracking_id } = req.body;
//   try {
//     const gradMatch = await Grad.findOne({ name: grade }).exec();
//     const trayMatch = await Tray.findOne({ id: current_tray }).exec();
//     const orderId = await Order.findOne({ order_id: order_id }).exec();
//     const trackingId = await Order.findOne({ tracking_id: tracking_id }).exec();
//     if (!gradMatch) {
//       res.json({ ok: false, message: "Grade dose not match" });
//     } else {
//       res.json({ ok: true, message: "" });
//     }
//     if (!trayMatch) {
//       res.json({ ok: false, message: "Tray dose not match" });
//     } else {
//       res.json({ ok: true, message: "" });
//     }
//     if (!orderId) {
//       res.json({ ok: false, message: "Order id dose not match" });
//     } else {
//       res.json({ ok: true, message: "" });
//     }
//     if (!trackingId) {
//       res.json({ ok: false, message: "Tracking id dose not match" });
//     } else {
//       res.json({ ok: true, message: "" });
//     }
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };

exports.gradChecker = async (req, res) => {
  const { grade } = req.params;
  try {
    const gradMatch = await Grad.findOne({ name: grade }).exec();
    if (!gradMatch) {
      res.json({ ok: false, message: "Grade dose not match" });
    }
    res.json({ ok: true, message: "" });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.TrayChecker = async (req, res) => {
  const { current_tray } = req.params;
  try {
    const trayMatch = await Tray.findOne({ id: current_tray }).exec();
    if (!trayMatch) {
      res.json({ ok: false, message: "Tray dose not match" });
    }
    res.json({ ok: true, message: "" });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.remove = async (req, res) => {
  try {
    let deleteTray = await Tray.findOneAndRemove({
      id: req.params.id,
    }).exec();
    res.json(deleteTray);
  } catch (err) {
    res.status(400).send("Tray deleted failed");
  }
};

exports.read = async (req, res) => {
  try {
    let tray = await Tray.findOne({ id: req.params.id }).exec();
    res.json(tray);
  } catch {
    res.status(400).send("Tray read faild");
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Order.findOneAndUpdate(
      { uic: req.params.uic },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("update err", err);
    res.status(400).json("Order update faild");
  }
};

exports.list = async (req, res) => {
  try {
    let tray = await Order.find({})
      .populate("grade")
      .populate("current_tray")
      .sort({ createdAt: -1 })
      .exec();
    res.json(tray);
  } catch (err) {
    res.status(400).json(err);
    console.log("list error", err);
  }
};

exports.read = async (req, res) => {
  try {
    let tray = await Tray.findOne({ id: req.params.id }).exec();
    res.json(tray);
  } catch {
    res.status(400).send("Tray read faild");
  }
};

// find id
exports.findId = async (req, res) => {
  try {
    console.log("body", req.body);
    const { type } = req.params;
    const tray = await Tray.find({ type }).exec();
    console.log("tray", tray);
    const newId = type + "000000" + tray.length;
    res.json({ id: newId });
  } catch (err) {
    // console.log("error", err);
    res.status(400).send(err);
  }
};

exports.findOrder = async (req, res) => {
  try {
    const { uic } = req.params;
    const order = await Order.find({ uic })
      .populate("grade")
      .populate("current_tray")
      .exec();
    res.json({ order });
  } catch (err) {
    // console.log("error", err);
    res.status(400).send(err);
  }
};
