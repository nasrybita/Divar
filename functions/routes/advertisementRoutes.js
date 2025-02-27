const express = require("express");
const router = express.Router();
const {
  createAdvertisement,
} = require("../controllers/advertisementController");

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
 *         createdDate:
 *           type: string
 *           format: date-time
 *           description: The date when the advertisement was created
 *           example: "2023-04-01T12:00:00Z"
 *         updatedDate:
 *           type: string
 *           format: date-time
 *           description: The date when the advertisement was last updated
 *           example: "2023-04-05T12:00:00Z"
 */

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
router.post("/", createAdvertisement);

// get advertisement
// router.get("/", async (req, res) => {
//   try {
//   } catch (err) {}
// });

// get one advertisement
// router.get("/:id", async (req, res) => {
//   try {
//   } catch (err) {}
// });

// update one advertisement
// router.patch("/:id", async (req, res) => {
//   try {
//   } catch (err) {}
// });

// delete one advertisement
// router.delete("/:id", async (req, res) => {
//   try {
//   } catch (err) {}
// });

// export router
module.exports = router;
