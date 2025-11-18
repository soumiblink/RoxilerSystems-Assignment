const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const authMiddleware = async (req, res, next) => {
  const token = req.header("authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(402).json({
      message: "No token, authorization failed",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        address: true,
      },
    });

    if (!user) {
      return res.status(402).json({
        error: "Token is not valid",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(402).json({
      error: "Token is invalid",
    });
  }
};

module.exports = authMiddleware;
