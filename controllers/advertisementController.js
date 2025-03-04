const Joi = require("joi");
const Advertisement = require("../models/advertisementModel");
const advertisementSchema = require("../validators/advertisementValidator");

const createAdvertisement = async (req, res, next) => {
  // Remove createdDate and updatedDate from the request body
  const { createdDate, updatedDate, ...sanitizedBody } = req.body;

  const { error, value } = advertisementSchema.validate(sanitizedBody);

  if (error) {
    return next(error); // Pass Joi validation errors to custom error handler
  }

  // Explicitly remove createdDate and updatedDate from value before creating the Advertisement
  delete value.createdDate;
  delete value.updatedDate;

  const newAd = new Advertisement(value);

  try {
    const savedAd = await newAd.save();
    res.status(201).json(savedAd);
  } catch (error) {
    return next(error); // Pass other errors to custom error handler
  }
};

module.exports = {
  createAdvertisement,
};
