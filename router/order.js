const express = require("express");

const router = express.Router();

// controller
const {
  create,
  list,
  update,
  // read,
  // remove,
  gradChecker,
  TrayChecker,
  findOrder,
} = require("../controller/order");

// employee route
router.get("/orders/:grade", gradChecker);
router.get("/orders/:current_tray", TrayChecker);
router.get("/orders", list);
router.post("/order", create);
router.get("/order-by/:uic", findOrder);
router.put("/order/:uic", update);
// router.get("/orders", list);
// router.get("/orders/:slug", read);
// router.delete("/order/:slug", remove);

module.exports = router;
