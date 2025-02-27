const mongoose = require("mongoose");
const { Schema } = mongoose;

const advertisementSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
  },

  description: {
    type: String,
    trim: true,
    required: true,
    minlength: 10,
  },

  // price: {
  //   type: Number,
  //   required: function () {
  //     return this.category.toString() === "<RegularCategoryId>"; // Replace with the actual ID for categories that require 'price'
  //   },
  //   min: 0.01,
  // },

  // depositPrice: {
  //   type: Number,
  //   required: function () {
  //     return this.category.toString() === "<RealEstateCategoryId>"; // Replace with the actual ID for real estate category
  //   },
  //   min: 1000000,
  // },

  // monthlyRentPrice: {
  //   type: Number,
  //   required: function () {
  //     return this.category.toString() === "<RealEstateCategoryId>"; // Replace with the actual ID for real estate category
  //   },
  //   min: 100000,
  // },

  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },

  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  //   required: true,
  // },

  // subCategory: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "SubCategory",
  //   required: true,
  // },

  // miniCategory: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "MiniCategory",
  //   required: true,
  // },

  // location: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Location",
  //   required: true,
  // },

  coordinates: {
    type: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },

  // status: {
  //   type: String,
  //   required: true,
  //   enum: ["active", "inprogress", "expired"],
  //   default: "active",
  // },

  createdDate: {
    type: Date,
    default: Date.now,
  },

  updatedDate: {
    type: Date,
    default: Date.now,
  },

  // images: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Image",
  //   },
  // ],

  // advertisementTags: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "AdvertisementTag",
  //   },
  // ],

  // messages: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Message",
  //   },
  // ],

  // bookmarks: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Bookmark",
  //   },
  // ],

  // notes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Note",
  //   },
  // ],

  // reports: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Report",
  //   },
  // ],

  // views: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "View",
  //   },
  // ],

  contactMethods: {
    textMessageInChat: {
      type: Boolean,
      default: true,
    },
    phoneCall: {
      type: {
        receiveCall: {
          type: Boolean,
          default: true,
        },
        callType: {
          type: String,
          enum: ["direct", "intermediary"],
          default: "direct",
        },
      },
      default: {},
    },
  },

  //category-specific attributes
  // features: {
  //   type: Map,
  //   of: Schema.Types.Mixed,
  //   default: {},
  // },
});

// handle contact methods
advertisementSchema.pre("save", function (next) {
  const ad = this;

  if (
    !ad.contactMethods.textMessageInChat &&
    !ad.contactMethods.phoneCall.receiveCall
  ) {
    return next(new Error("At least one contact method must be chosen"));
  }

  next();
});

// handle category-specific features
// advertisementSchema.pre("save", function (next) {
//   const ad = this;

//   Additional validation for category-specific features
//   if (ad.category.toString() === "<ApartmentCategoryId>") {
//     // Validate apartment-specific features
//     if (
//       !ad.features.has("area") ||
//       !ad.features.get("numberOfRooms") ||
//       !ad.features.get("constructionYear") ||
//       !ad.features.get("floor") ||
//       !ad.features.get("elevator") ||
//       !ad.features.get("parking") ||
//       !ad.features.get("storage")
//     ) {
//       return next(
//         new Error("Required apartment-specific features are missing.")
//       );
//     }
//   } else if (ad.category.toString() === "<HouseCategoryId>") {
//     // Validate house-specific features
//     if (
//       !ad.features.has("landArea") ||
//       !ad.features.get("buildingArea") ||
//       !ad.features.get("numberOfRooms") ||
//       !ad.features.get("constructionYear") ||
//       !ad.features.get("parking") ||
//       !ad.features.get("storage") ||
//       !ad.features.get("balcony")
//     ) {
//       return next(new Error("Required house-specific features are missing."));
//     }
//   }

//   next();
// });

// handle maximum image uploads
// advertisementSchema.pre("save", function (next) {
//   const ad = this;

//   if (ad.images.length > 20) {
//     return next(new Error("You can upload a maximum of 20 images."));
//   }

//   next();
// });

// create and export model
const Advertisement = mongoose.model("Advertisement", advertisementSchema);
module.exports = Advertisement;
