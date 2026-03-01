const express = require("express");
const { body } = require("express-validator");

const itemController = require("../controllers/itemController");

const router = express.Router();

// GET all items
router.get("/", itemController.getAllItems);

// CREATE item
router.post(
  "/",
  [
    body("title").notEmpty().isLength({ min: 3 }),
    body("description").notEmpty(),
    body("category").isIn(["Lost", "Found"]),
    body("location").notEmpty(),
    body("date").isDate(),
    body("contact").notEmpty().isLength({ min: 5 }),
  ],
  itemController.createItem
);

// UPDATE status
router.put("/:id", itemController.updateStatus);

// DELETE item
router.delete("/:id", itemController.deleteItem);

module.exports = router;