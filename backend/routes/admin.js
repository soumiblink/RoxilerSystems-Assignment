const express = require("express");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");
const {
  dashboard,
  addUser,
  users,
  stores,
  addStore,
} = require("../controllers/admin");
const router = express.Router();

router.use(authMiddleware, roleMiddleware(["SYSTEM_ADMIN"]));

router.get("/dashboard", dashboard);
router.post("/users", addUser);
router.get("/users", users);
router.get("/stores", stores);
router.post("/stores", addStore);

module.exports = router;
