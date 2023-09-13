const express = require("express");

const router = express.Router();

// controller
const {
  create,
  list,
  update,
  read,
  remove,
  findId,
} = require("../controller/tray");

// employee route
router.get("/trays", list);
router.get("/trays/:id", read);
router.post("/tray", create);
router.put("/tray/:id", update);
router.delete("/tray/:id", remove);
router.get("/find-trays-id/:type", findId);

module.exports = router;
