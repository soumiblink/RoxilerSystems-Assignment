const express = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  getAllStores,
  ownerDashboard,
  giveRating,
} = require("../controllers/store");
const roleMiddleware = require("../middlewares/role");
const router = express.Router();

router.get("/", authMiddleware, roleMiddleware(["NORMAL_USER"]), getAllStores);
router.post(
  "/:storeId/rate",
  authMiddleware,
  roleMiddleware(["NORMAL_USER"]),
  giveRating
);
router.get(
  "/owner/dashboard",
  authMiddleware,
  roleMiddleware(["STORE_OWNER"]),
  ownerDashboard
);

module.exports = router;
