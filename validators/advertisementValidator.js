const Joi = require("joi");

// Advertisement validation
const advertisementSchema = Joi.object({
  title: Joi.string().trim().min(4).required(),
  description: Joi.string().trim().min(10).required(),
  // price: Joi.number().min(0.01),
  // depositPrice: Joi.number().min(1000000),
  // monthlyRentPrice: Joi.number().min(100000),
  // user: Joi.string(), // Use object ID validations if needed
  // category: Joi.string(), // Use object ID validations if needed
  // subCategory: Joi.string(), // Use object ID validations if needed
  // miniCategory: Joi.string(), // Use object ID validations if needed
  // location: Joi.string(), // Use object ID validations if needed
  coordinates: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).required(),
  // status: Joi.string().valid("active", "inprogress", "expired"),
  // images: Joi.array().items(Joi.string()), // Use object ID validations if needed
  // advertisementTags: Joi.array().items(Joi.string()), // Use object ID validations if needed
  // messages: Joi.array().items(Joi.string()), // Use object ID validations if needed
  // bookmarks: Joi.array().items(Joi.string()), // Use object ID validations if needed
  // notes: Joi.array().items(Joi.string()), // Use object ID validations if needed
  // reports: Joi.array().items(Joi.string()), // Use object ID validations if needed
  // views: Joi.array().items(Joi.string()), // Use object ID validations if needed
  contactMethods: Joi.object({
    textMessageInChat: Joi.boolean().default(true),
    phoneCall: Joi.object({
      receiveCall: Joi.boolean().default(true),
      callType: Joi.string().valid("direct", "intermediary").default("direct"),
    }).default(),
  }).required(),
  // features: Joi.object().default({}), // Adjust validations based on your requirements
});


// Advertisement validation for update
const updateAdvertisementSchema = Joi.object({
  title: Joi.string().trim().min(4),
  description: Joi.string().trim().min(10),
  coordinates: Joi.object({
    latitude: Joi.number(),
    longitude: Joi.number(),
  }),
  contactMethods: Joi.object({
    textMessageInChat: Joi.boolean().default(true),
    phoneCall: Joi.object({
      receiveCall: Joi.boolean().default(true),
      callType: Joi.string().valid("direct", "intermediary").default("direct"),
    }).default(),
  }),
}).min(1); // Ensure at least one field is provided for update

module.exports = { advertisementSchema, updateAdvertisementSchema };
