const express = require('express');

const itemController = require('../controllers/itemController');

const router = express.Router();

router.get('/', itemController.getMany);
router.get('/one/:id', itemController.getOne);

module.exports = router;
