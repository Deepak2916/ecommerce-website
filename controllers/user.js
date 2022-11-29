// const User = require('../models/user');

// const adduser=async (req,res)=>{
//     let info={
//        name:req.body.title,
//        email:req.body.price,
//     }
//     try{
//         const user=await User.create(info)
//         res.status(200).json(user)
//     }
//     catch(err){
//        console.log(err) 
//     }   
// }
// const getAllusers=async (req,res)=>{
//     try{
       
//         const user=await User.findAndCountAll()
//         res.status(200).json()
//     }
//     catch(err){
//         console.log(err)
//     }
// }


// module.exports={adduser,getAllusers}