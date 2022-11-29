const express = require('express');


const orderController = require('../controllers/orders');

const router = express.Router();

router.post('/',orderController.createOrder)
router.get('/',orderController.GetOrders)



module.exports=router