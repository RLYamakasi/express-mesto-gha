const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/auth');
const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');
const { errorHandler } = require('./errors');
const {
  login, register, validate,
} = require('./controllers/users');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports.createCard = (req) => {
  console.log(req.user._id);
};

mongoose.connect('mongodb://localhost:27017/mestodb ', (err) => {
  if (!err) console.log('сервер запущен');
  else console.log('ошибка');
  app.use('/', errorHandler);
  app.post('/signin', validate, login);
  app.post('/signup', validate, register);
  app.use('/', auth, routesUser);
  app.use('/', auth, routesCard);
});

app.listen(PORT, () => {
  console.log(`server is on ${PORT}`);
});
