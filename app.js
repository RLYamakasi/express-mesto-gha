const express = require('express');
const mongoose = require('mongoose');
const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');
const PORT = process.env.PORT ?? 3000
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));





app.use((req, res, next) => {
  req.user = {
    _id: '634c676d8a61975bd2d31931'
  };

  next();
});

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};



mongoose.connect('mongodb://localhost:27017/mestodb ',(err)=> {
  if(!err) console.log("harosh");
  else console.log("loh");
  // app.use('/*', NotFoundController);
  app.use('/', routesUser);
  app.use('/', routesCard);
});




app.post('/')


app.listen(PORT, ()=>{
  console.log(`server is on ${PORT}`)
})