const express = require('express');
const mongoose = require('mongoose');
const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');
const PORT = process.env.PORT ?? 3000
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));


// module.exports.Error= (req, res) => {
//   console.log(req.user._id); // _id станет доступен
// };


// router.get('/users', Error);


app.use((req, res, next) => {
  req.user = {
    _id: '634d9ee277f288e94364c73c'
  };

  next();
});

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};



mongoose.connect('mongodb://localhost:27017/mestodb ',(err)=> {
  if(!err) console.log("Сервер запущен");
  else console.log("ошибка");
  // app.use('/*', NotFoundController);
  app.use('/', routesUser);
  app.use('/', routesCard);
  app.patch('/404', function (req, res) {
    console.log("/user request called");
    res.send({message:'Страница не найдена'})
    .catch((err) => {
      res
        .status(404)
        .send({ message: err.message});
    });;
});
});




app.post('/')


app.listen(PORT, ()=>{
  console.log(`server is on ${PORT}`)
})