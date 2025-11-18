const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const { validateNewPassword } = require("../utils/validation");

const updatePassword = async (req, res) => {
  const parseData = validateNewPassword.safeParse(req.body);
  if (!parseData.success) {
    const errors = parseData?.error?.issues;
    const errorMessages = errors.map((error) => error.message);
    return res.status(401).json({
      error: errorMessages,
    });
  }

  try {
    const { currentPassword, newPassword } = parseData.data;

    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Interval server error",
    });
  }
};

module.exports = { updatePassword };
