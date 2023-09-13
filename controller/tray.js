const Tray = require("../models/Tray");
const Grad = require("../models/grad");
const slugify = require("slugify");

// create Tray
exports.create = async (req, res) => {
  try {
    const newTray = await new Tray(req.body).save();
    res.json(newTray);
  } catch (err) {
    // console.log("error", err);
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
    let tray = await Tray.findOne({ id: req.params.id })
      .exec();
    res.json(tray);
  } catch {
    res.status(400).send("Tray read faild");
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Tray.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("update err", err);
    res.status(400).json("Tray update faild");
  }
};

exports.list = async (req, res) => {
  try {
    let tray = await Tray.find({}).populate("grad").sort({ createdAt: -1 }).exec();
    res.json(tray);
  } catch (err) {
    res.status(400).json(err);
    console.log("list error", err);
  }
};

exports.read = async (req, res) => {
  try {
    let tray = await Tray.findOne({ id: req.params.id })
      .exec();
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
    const tray = await Tray.find({type}).exec();
    console.log("tray", tray);
    const newId = type + '000000' + tray.length;
    res.json({id: newId});
  } catch (err) {
    // console.log("error", err);
    res.status(400).send(err);
  }
}
