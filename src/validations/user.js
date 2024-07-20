const Joi = require("joi");

// Custom Joi extension for ObjectId validation
const objectId = Joi.extend((joi) => ({
  type: "objectId",
  base: joi.string(),
  messages: {
    "objectId.invalid": "{{#label}} must be a valid ObjectId",
  },
  validate(value, helpers) {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return { value, errors: helpers.error("objectId.invalid") };
    }
  },
}));

const pagination = {
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
};

const getAllUsers = {
  query: Joi.object().keys({
    ...pagination,
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string(),
  }),
};

const createUser = {
  body: Joi.object().keys({
    firstname: Joi.string().required().trim(),
    lastname: Joi.string().required().trim(),
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required().min(6),
  }),
};

const getEachUser = {
  params: Joi.object().keys({
    id: objectId.objectId().required(),
  }),
};

module.exports = {
  getAllUsers,
  createUser,
  getEachUser,
};
