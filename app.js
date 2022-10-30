const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const BAD_REQ = 404;

app.use((req, res, next) => {
  req.user = {
    _id: '635c0adf1f9d3e6e232b8609',
  };

  next();
});

module.exports.createCard = (req) => {
  console.log(req.user._id);
};

mongoose.connect('mongodb://localhost:27017/mestodb ', (err) => {
  if (!err) console.log('сервер запущен');
  else console.log('ошибка');
  app.use('/', routesUser);
  app.use('/', routesCard);
  app.use((req, res) => {
    res.status(BAD_REQ).send({ message: '404 Page Not Found' });
  });
});

app.listen(PORT, () => {
  console.log(`server is on ${PORT}`);
});
