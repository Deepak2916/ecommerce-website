
const express = require('express');

const cartController = require('../controllers/cart');

const router = express.Router();



router.get('/', cartController.getAllProducts);

router.delete('/deleteall',cartController.deleteAll)

router.post('/post/:id', cartController.addProduct);


router.get('/product/:id',cartController.getOneProduct)


router.delete('/delete/:id', cartController.deleteProduct);

module.exports = router;