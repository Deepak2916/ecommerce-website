const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();



router.get('/products', adminController.getAllProducts);


router.post('/add-product', adminController.addProduct);

router.get('/products/:id',adminController.getOneProduct)
router.put('/edit/:id', adminController.editProduct);

router.delete('/delete/:id', adminController.deleteProduct);

module.exports = router;
