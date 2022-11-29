const OrderItems = require('../models/order-items')
const Order=require('../models/orders')

const createOrder= async (req,res)=>{
    try{
    let order=await req.user[0].createOrder()
    let cart=await req.user[0].getCart()
    let products=await cart.getProducts()
    order.addProducts(products.map(product=>{
        product.orderItems={quantity:product.cartItem.quantity}
        return product
    }))
    cart.setProducts(null)
    res.json({success:true})
    }
    catch(err){
        console.log(err)
        res.json({success:false})
    }
}

const GetOrders= async (req,res)=>{
    let orders=await req.user[0].getOrders({include:'products'})

    res.send(orders)
}

module.exports={createOrder,GetOrders}