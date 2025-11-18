const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { updatePassword } = require("../controllers/user");
const roleMiddleware = require("../middlewares/role");

router.use(authMiddleware, roleMiddleware(["NORMAL_USER", "STORE_OWNER"]));
router.patch("/password", updatePassword);

module.exports = router;
