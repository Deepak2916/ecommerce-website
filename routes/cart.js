
const express = require('express');

const cartController = require('../controllers/cart');

const router = express.Router();



router.get('/', cartController.getAllProducts);


router.post('/post', cartController.addProduct);

router.get('/product/:id',cartController.getOneProduct)
router.put('/edit/:id', cartController.editProduct);

router.delete('/delete/:id', cartController.deleteProduct);

module.exports = router;