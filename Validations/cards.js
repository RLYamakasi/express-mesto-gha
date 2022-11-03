const Joi = require('joi');

exports.cardValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(/^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i).required(),
  });
  return schema.validate(data);
};
