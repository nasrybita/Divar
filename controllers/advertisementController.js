const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Advertisement = require("../models/advertisementModel");
const {
  advertisementSchema,
  updateAdvertisementSchema,
} = require("../validators/advertisementValidator");
const idSchema = require("../validators/idValidator");

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

const getAdvertisements = async (req, res, next) => {
  try {
    const advertisements = await Advertisement.find();
    res.status(200).json(advertisements);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};

const getAdvertisementById = async (req, res) => {
  const { error } = idSchema.validate({ id: req.params.id });
  if (error) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const advertisement = await Advertisement.findById(req.params.id);
    if (!advertisement) {
      return res.status(404).json({ message: "Advertisement not found" });
    }
    res.status(200).json(advertisement);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};

const updateAdvertisement = async (req, res, next) => {
  const { error: idError } = idSchema.validate({ id: req.params.id });
  if (idError) return res.status(400).json({ message: "Invalid ID format" });
  const { error, value } = updateAdvertisementSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const updatedAd = await Advertisement.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    if (!updatedAd)
      return res.status(404).json({ message: "Advertisement not found" });
    res.status(200).json(updatedAd);
  } catch (err) {
    next(err);
  }
};

const deleteAdvertisement = async (req, res, next) => {
  const { error } = idSchema.validate({ id: req.params.id });
  if (error) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const deletedAd = await Advertisement.findByIdAndDelete(req.params.id);
    if (!deletedAd) {
      return res.status(404).json({ message: "Advertisement not found" });
    }
    res.status(200).json({ message: "Advertisement successfully deleted" });
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};

module.exports = {
  createAdvertisement,
  getAdvertisements,
  getAdvertisementById,
  updateAdvertisement,
  deleteAdvertisement,
};
