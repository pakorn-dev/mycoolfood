const express = require('express');
const router = express.Router();
const backendController = require('../controllers/backendController');

// Buyer
router.post('/buyer/sender-register', backendController.createBuyer);
router.get('/buyer/:id', backendController.getBuyerById);

// Seller
router.get('/seller', backendController.getSeller);

// Order
router.get('/order/:id', backendController.getOrderById);
router.get('/order-confirm/:id', backendController.confirmOrder);
router.post('/order/create', backendController.createOrder);

// Message
router.post('/send-message', backendController.sendMessage);

router.get('/check', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is reachable!' });
});

module.exports = router;
