const express = require('express');

const purchaseController = require('../controllers/purchaseController');
const isAuthorized = require('../middlewares/isAuthorized');

const router = express.Router();

router.use(isAuthorized);

router.post('/create', purchaseController.createOne);

router.get('/all', purchaseController.getMany);

router.get('/one/:id', purchaseController.getOne);

module.exports = router;
