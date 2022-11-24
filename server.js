const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const cors=require('cors')
const app = express();


const adminRoutes = require('./routes/admin');
const cartRoutes = require('./routes/cart');

app.use(bodyParser.json());

app.use(cors())
app.use('/admin', adminRoutes);
app.use('/cart',cartRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
