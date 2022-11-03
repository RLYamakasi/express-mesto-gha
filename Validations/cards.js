const { celebrate, Joi } = require('celebrate');

exports.cardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'string.empty': 'Поле "name" должно быть заполнено',
      }),
    link: Joi.string().required().pattern(/^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i)
      .messages({
        'string.empty': 'Поле "link" должно быть заполнено',
      }),
  }),
});
