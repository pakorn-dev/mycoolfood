const Buyer = require('../models/Buyer');
const Order = require('../models/Order');
const Seller = require('../models/Seller')

const lineMessageApiUrl = process.env.LINE_MESSAGE_API_URL;
const lineMessageApiToken = process.env.LINE_MESSAGE_API_TOKEN
// Buyer
exports.createBuyer = async (req, res) => {
    try {
        const findBuyer = await Buyer.findOne({ userId: req.body.userId });
        if (findBuyer) throw Error('Buyer is already registered.')
        const buyer = new Buyer(req.body);
        await buyer.save();
        res.status(201).json(buyer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBuyerById = async (req, res) => {
    try {
        const userId = req.params.id
        const findBuyer = await Buyer.findOne({ userId });
        res.status(201).json(findBuyer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Seller
exports.getSeller = async (req, res) => {
    try {
        const findSeller = await Seller.find();
        res.status(201).json(findSeller);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Order 
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const findOrder = await Order.findOne({ _id: orderId });
        res.status(201).json(findOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.confirmOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const result = await Order.findOneAndUpdate({ _id: orderId }, { $set: { isConfirm: true } }, { new: true })
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const body = req.body;
        const findBuyer = await Buyer.findOne({ userId: body.buyerId });
        const newBody = {
            order: body.order,
            buyerId: body.buyerId,
            sellerId: body.sellerId,
            buyerName: findBuyer.name,
            buyerAddress: findBuyer.address,
            buyerPhoneNumber: findBuyer.phoneNumber,
        }
        const order = new Order(newBody);
        const newOrder = await order.save();
        const link = `https://liff.line.me/2009740233-BS9lMxjG?orderId=${newOrder._id}`
        const newest = await Order.findOneAndUpdate({ _id: newOrder._id }, { $set: { confirmLink: link } }, { new: true })
        res.status(201).json(newest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const userId = req.body.userId;
        const seller = await Seller.findOne({ _id: req.body.sellerId });
        const link = req.body.link;
        const response = await fetch(lineMessageApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${lineMessageApiToken}`
            },
            body: JSON.stringify({
                to: userId,
                messages: [
                    {
                        type: 'text',
                        text: `ร้าน : ${seller.name}\nยืนยันคำสั่งซื้อเรียบร้อยแล้ว\nคำสั่งซื้อ : ${link}`
                    }
                ]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
