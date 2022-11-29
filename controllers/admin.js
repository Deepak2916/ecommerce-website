const Product = require('../models/product');
// const User=require('../models/user')
const addProduct=async (req,res)=>{
    // console.log(req.user)
    let info={
       title:req.body.title,
       price:req.body.price,
       imageUrl:req.body.imageUrl,
    }
    try{
        let user=req.user[0]
        const product=await user.createProduct(info)
        res.status(200).json(product)
    }
    catch(err){
       console.log('it is error',err) 
    }   
}
const getAllProducts=async (req,res)=>{
    try{
        let pageNumber=+req.query.page
        let sizeNumber=+req.query.size
        let user=req.user[0]
        let [page,size]=[1,2]
         if(pageNumber>1){
            page=pageNumber
         }
         if(sizeNumber>2){
            size=sizeNumber
         }
        const product=await user.getProducts({
            limit:size,
            offset:(page-1)*size
        })
        let products=await user.countProducts()
        
        let pages=Math.ceil(products/size)
        // console.log(products,size,pages)
       
        // console.log(products)
        // console.log(req.user)
        res.status(200).json({
            products:product,
            pages:pages
        })
    }
    catch(err){
        console.log(err)
    }
}

const deleteProduct=async (req,res)=>{
    try{
        let id=req.params.id
        let user=req.user[0]
        await Product.destroy({where:{id:id}})
        res.status(200).send('product deleted')
    }
    catch(err){
        console.log(err)
    }
}
const editProduct=async (req,res)=>{
    let info={
      title:req.body.title,
      price:req.body.price,
      imageUrl:req.body.imageUrl 
    }
    try{
       
        let id=req.params.id
        const product=await Product.update(info,{where:{id:id}})
        res.status(200).json(product)
    }
    catch(err){
        console.log(err)
    }
  }
    const getOneProduct=async (req,res)=>{
      try{
         
          let id=req.params.id
          const product=await Product.findAll({where:{id:id}})
          res.status(200).json(product)
      }
      catch(err){
          console.log(err)
      }
}

module.exports={addProduct,getAllProducts,deleteProduct,editProduct,getOneProduct}