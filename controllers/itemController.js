const { validationResult } = require("express-validator");
const itemModel = require("../models/itemModel");

exports.getAllItems = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const item = await itemModel.getItemById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};



exports.createItem = async (req, res) => {
  try {
    const result = await itemModel.createItem(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error creating item" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    await itemModel.updateStatus(req.params.id);
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await itemModel.deleteItem(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};