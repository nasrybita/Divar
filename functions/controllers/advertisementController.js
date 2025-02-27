const Advertisement = require("../models/advertisementModel");

const createAdvertisement = async (req, res) => {
  const {
    title,
    description,
    price,
    depositPrice,
    monthlyRentPrice,
    user,
    category,
    subCategory,
    miniCategory,
    location,
    coordinates,
    status,
    images,
    advertisementTags,
    messages,
    bookmarks,
    notes,
    reports,
    views,
    contactMethods,
    features,
  } = req.body;

  const newAd = new Advertisement({
    title,
    description,
    price,
    depositPrice,
    monthlyRentPrice,
    user,
    category,
    subCategory,
    miniCategory,
    location,
    coordinates,
    status,
    images,
    advertisementTags,
    messages,
    bookmarks,
    notes,
    reports,
    views,
    contactMethods,
    features,
  });

  try {
    const savedAd = await newAd.save();
    res.status(201).json(savedAd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAdvertisement,
};
