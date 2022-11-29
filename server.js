const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const User=require('./models/user')
const Product=require('./models/product')
const Cart=require('./models/cart')
const CartItem=require('./models/cart-items')
const Order=require('./models/orders')
const OrderItems=require('./models/order-items')
const cors=require('cors')
const app = express();

const adminRoutes = require('./routes/admin');
const cartRoutes = require('./routes/cart');
const orderRoutes=require('./routes/orders')

app.use(bodyParser.json());
app.use((req,res,next)=>{
  User.findAll({where:{id:1}})
  .then(user=>{
    req.user=user
    next()
  })
  .catch(err=>console.log(err))
})

app.use(cors())
app.use('/admin', adminRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes)

app.use(errorController.get404);

Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through:CartItem})
Product.belongsToMany(Cart,{through:CartItem})

Order.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Order)
Order.belongsToMany(Product,{through:OrderItems})
Product.belongsToMany(Order ,{through:OrderItems})



sequelize
  // .sync({force:true})
  .sync()
  .then(result => {
    return User.findAll({where:{id:1}})
  }).then(user => {
    if(user.length==0){
    return User.create({
      name:'deepak',
      email:'deepak@gmail.com'
    })
  }
  return user;
  }).then(user=>{
    return user[0].createCart()
   
  }).then((cart)=>{
    app.listen(3000)
  })
  .catch(err => {
    console.log(err);
  });
