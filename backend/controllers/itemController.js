const Item = require('../models/itemModel');

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);

    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: "This item doesn't exist." });
  }
};

const getMany = async (req, res) => {
  try {
    const items = await Item.find();

    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getOne,
  getMany,
};
