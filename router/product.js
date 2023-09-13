const express = require("express");

const router = express.Router();

// controller
const {
  create,
  read,
  update,
} = require("../controller/product");

// employee route
router.post("/product", create);
router.get("/product/:uic", read);
router.put("/product/:uic", update);
// router.get("/orders", list);
// router.put("/order/:slug", update);
// router.delete("/order/:slug", remove);

module.exports = router;
