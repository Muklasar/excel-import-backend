const express = require("express");

const router = express.Router();

// controller
const {
  create,
  list,
  update,
  read,
  remove,
} = require("../controller/grad");

// employee route
router.get("/grads", list);
router.get("/grads/:slug", read);
router.post("/grad", create);
router.put("/grad/:slug", update);
router.delete("/grad/:slug", remove);

module.exports = router;
