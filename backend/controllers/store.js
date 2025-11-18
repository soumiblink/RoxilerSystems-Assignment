const prisma = require("../lib/prisma");
const { validateRating } = require("../utils/validation");

const getAllStores = async (req, res) => {
  const { name, address, sortBy = "name", sortOrder = "asc" } = req.query;

  let where = {};
  if (name) where.name = { contains: name, mode: "insensitive" };
  if (address) where.address = { contains: address, mode: "insensitive" };

  try {
    const stores = await prisma.store.findMany({
      where,
      include: {
        ratings: {
          select: {
            rating: true,
            userId: true,
          },
        },
        owner: {
          select: { name: true },
        },
      },
      orderBy: { [sortBy]: sortOrder },
    });

    const storesWithRatings = stores.map((store) => {
      const ratings = store.ratings;
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          : 0;
      const userRating = ratings.find((r) => r.userId === req.user.id);
      return {
        id: store.id,
        name: store.name,
        address: store.address,
        overallRating: avgRating,
        userRating: userRating ? userRating.rating : null,
        totalRatings: ratings.length,
      };
    });

    res.status(200).json({ storesWithRatings });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const giveRating = async (req, res) => {
  try {
    const { storeId } = req.params;
    const parseData = validateRating.safeParse(req.body);

    if (!parseData.success) {
      const errors = parseData?.error?.issues;
      const errorMessages = errors.map((error) => error?.message);
      return res.status(400).json({
        error: errorMessages,
      });
    }

    const userId = req.user.id;

    const { rating } = parseData.data;

    const userRating = await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId,
          storeId: parseInt(storeId),
        },
      },
      update: {
        rating: parseInt(rating),
      },
      create: {
        rating: parseInt(rating),
        userId,
        storeId: parseInt(storeId),
      },
      include: {
        store: {
          select: { name: true },
        },
      },
    });

    console.log("user rating", userRating);
    res.status(200).json({
      message: "Rating submitted successfully",
      userRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const ownerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const store = await prisma.store.findMany({
      where: { ownerId: userId },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!(store.length > 0)) {
      return res.status(400).json({
        message: "Store not found",
      });
    }

    const storesWithAvgRating = store.map((store) => {
      const avgRating =
        store.ratings.length > 0
          ? store.ratings.reduce((sum, r) => sum + r.rating, 0) /
            store.ratings.length
          : 0;

      return {
        store: {
          id: store.id,
          name: store.name,
          email: store.email,
          address: store.address,
        },
        averageRating: avgRating,
        totalRatings: store.ratings.length,
        ratings: store.ratings.map((r) => ({
          rating: r.rating,
          userName: r.user.name,
          userEmail: r.user.email,
          submittedAt: r.createdAt,
        })),
      };
    });

    res.status(200).json({
      storesWithAvgRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = { getAllStores, giveRating, ownerDashboard };
