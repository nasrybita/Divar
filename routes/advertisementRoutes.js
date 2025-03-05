const express = require("express");
const router = express.Router();

const {
  createAdvertisement,
  getAdvertisements,
  getAdvertisementById,
  updateAdvertisement,
  deleteAdvertisement,
} = require("../controllers/advertisementController");

const Advertisement = require("../models/advertisementModel");

// ---------------------------------------------------------------
/**
 * @swagger
 * components:
 *   schemas:
 *     Advertisement:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - coordinates
 *         - contactMethods
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the advertisement
 *           example: "Spacious apartment for rent"
 *         description:
 *           type: string
 *           description: The description of the advertisement
 *           example: "A beautiful and spacious apartment located in downtown."
 *         coordinates:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: Latitude of the location
 *               example: 35.6895
 *             longitude:
 *               type: number
 *               description: Longitude of the location
 *               example: 139.6917
 *           required:
 *             - latitude
 *             - longitude
 *         contactMethods:
 *           type: object
 *           properties:
 *             textMessageInChat:
 *               type: boolean
 *               example: true
 *             phoneCall:
 *               type: object
 *               properties:
 *                 receiveCall:
 *                   type: boolean
 *                   example: true
 *                 callType:
 *                   type: string
 *                   enum: ["direct", "intermediary"]
 *                   example: "direct"
 *           required:
 *             - textMessageInChat
 */

// ---------------------------------------------------------------
/**
 * @swagger
 * /api/v1/advertisement:
 *   post:
 *     summary: Create a new advertisement
 *     tags: [Advertisement]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Advertisement'
 *     responses:
 *       201:
 *         description: The advertisement was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 *       400:
 *         description: Bad request
 */

// create advertisement
// Joi validation applied in the createAdvertisement controller
router.post("/", createAdvertisement);

// ---------------------------------------------------------------
/**
 * @swagger
 * /api/v1/advertisement:
 *   get:
 *     summary: Retrieve all advertisements
 *     tags: [Advertisement]
 *     responses:
 *       200:
 *         description: Successfully retrieved advertisements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Advertisement'
 *       400:
 *         description: Bad request
 */

// get advertisements
// Joi validation not required
router.get("/", getAdvertisements);

// ---------------------------------------------------------------
/**
 * @swagger
 * /api/v1/advertisement/{id}:
 *   get:
 *     summary: Retrieve a single advertisement by ID
 *     tags: [Advertisement]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The advertisement ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the advertisement
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 *       404:
 *         description: Advertisement not found
 *       400:
 *         description: Bad request
 */

// get one advertisement
// Joi validation applied in the getAdvertisementByID controller
router.get("/:id", getAdvertisementById);

// ---------------------------------------------------------------
/**
 * @swagger
 * /api/v1/advertisement/{id}:
 *   patch:
 *     summary: Update an existing advertisement
 *     tags: [Advertisement]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The advertisement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Advertisement'
 *     responses:
 *       200:
 *         description: Successfully updated the advertisement
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 *       404:
 *         description: Advertisement not found
 *       400:
 *         description: Invalid ID format or bad request
 */

// update one advertisement
// Joi validation applied in the updateAdvertisement controller
router.patch("/:id", updateAdvertisement);

// ---------------------------------------------------------------
/**
 * @swagger
 * /api/v1/advertisement/{id}:
 *   delete:
 *     summary: Delete an advertisement by ID
 *     tags: [Advertisement]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The advertisement ID
 *     responses:
 *       200:
 *         description: Advertisement successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Advertisement successfully deleted
 *       404:
 *         description: Advertisement not found
 *       400:
 *         description: Invalid ID format or bad request
 */

// delete one advertisement
// Joi validation applied in the deleteAdvertisement controller
router.delete("/:id", deleteAdvertisement);

// export router
module.exports = router;
