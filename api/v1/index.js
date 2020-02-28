const express = require('express'); 
const router = express.Router();
const Product = require('../models/product');

router.get('/products', (req,res) => {
    Product.find()
    .sort({ "price": -1 })
    .exec()
    .then(products => res.status(200).json(products))
    .catch(err => res.status(500).json({
        message: 'Aucuns produits trouvés',
        error: err
    }))
});

router.post('/products', (req,res) => {
    console.log(res.body)
    const product = new Product(req.body);
    product.save((err, product)=>{
        if(err){
            return res.status(500).json(err)
        }
        res.status(201).json(product);
    })
});



module.exports = router;