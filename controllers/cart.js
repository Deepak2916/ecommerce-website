const Product = require('../models/cart');
// const CartItem = require('../models/cart-items');

const addProduct=async (req,res)=>{

    let id=req.params.id
    try{
        let newQuantity=1
        let cart=await req.user[0].getCart()
        let product=await req.user[0].getProducts({where:{id:id}})
        let existingproduct=await cart.getProducts({where:{id:id}})
        // console.log(existingproduct.length)
         if(existingproduct.length>0){
            let oldQuantity=existingproduct[0].cartItem.quantity
            newQuantity+=oldQuantity
         }
        let addProduct=await cart.addProduct(product,{through:{quantity:newQuantity}})
        res.status(200).json(addProduct)
    }
    catch(err){
       console.log(err) 
    }   
}
const getAllProducts=async (req,res)=>{
    try{
        
        const cart=await req.user[0].getCart()
        let product=await cart.getProducts()
        res.status(200).json(product)
    }
    catch(err){
        console.log(err)
    }
}

const deleteProduct=async (req,res)=>{
    try{

        let id=req.params.id
        const cart=await req.user[0].getCart()
        const product=await cart.getProducts({where:{id:id}})
        await cart.removeProduct(product)
        res.status(200).send('product deleted')
    }
    catch(err){
        console.log(err)
    }
}

    const getOneProduct=async (req,res)=>{
      try{
         
          let id=req.params.id
        //   const
          const product=await Product.findAll({where:{id:id}})
          res.status(200).json(product)
      }
      catch(err){
          console.log(err)
      }
}
const deleteAll=async (req,res)=>{
        try{
        // let id=req.params.id
        const cart=await req.user[0].getCart()
        // const product=await cart.getProducts({where:{id:id}})
        await cart.setProducts()
        res.status(200).send('all products deleted')
        }
        catch(err){
            console.log(err);
        }
}
module.exports={addProduct,getAllProducts,deleteProduct,getOneProduct,deleteAll}
