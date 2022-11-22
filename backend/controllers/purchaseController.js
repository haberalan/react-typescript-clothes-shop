const Purchase = require('../models/purchaseModel');

const createOne = async (req, res) => {
  const user_id = req.user._id;
  const { total, items } = req.body;

  try {
    const purchase = await Purchase.create({ user_id, total, items });

    res.status(200).json({ id: purchase._id });
  } catch (err) {
    res.status(400).json({ error: 'There was an error.' });
  }
};

const getMany = async (req, res) => {
  const user_id = req.user._id;

  try {
    const purchases = await Purchase.find({ user_id });

    res.status(200).json(purchases);
  } catch (err) {
    res.status(400).json({ error: 'There was an error.' });
  }
};

const getOne = async (req, res) => {
  const user_id = req.user._id;
  const { id: _id } = req.params;

  try {
    const purchase = await Purchase.find({ user_id, _id });

    res.status(200).json(purchase);
  } catch (err) {
    res.status(400).json({ error: 'There was an error.' });
  }
};

module.exports = { createOne, getMany, getOne };
