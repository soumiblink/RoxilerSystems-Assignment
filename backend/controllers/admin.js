const prisma = require("../lib/prisma");
const { validateStore, validateUser } = require("../utils/validation");
const bcrypt = require("bcryptjs");

const dashboard = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();

    res.status(200).json({
      totalUsers,
      totalStores,
      totalRatings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const addUser = async (req, res) => {
  const parseData = validateUser.safeParse(req.body);
  if (!parseData.success) {
    const errors = parseData?.error?.issues;
    const errorMessages = errors.map((error) => error?.message);
    return res.status(400).json({
      error: errorMessages,
    });
  }

  const { name, email, password, role, address } = parseData.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role: role || "NORMAL_USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const users = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      role,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;

    let where = {};
    if (name) where.name = { contains: name, mode: "insensitive" };
    if (email) where.email = { contains: email, mode: "insensitive" };
    if (address) where.address = { contains: address, mode: "insensitive" };
    if (role) where.role = role;

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        ownedStore: {
          select: {
            id: true,
            name: true,
            ratings: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
      orderBy: { [sortBy]: sortOrder },
    });

    // Calculate average rating for store owner
    const usersWithRatings = users.map((user) => {
      if (user.role === "STORE_OWNER" && user.store) {
        const ratings = user.store.ratings;
        const avgRating =
          ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : 0;
        return { ...user, averageRating: avgRating };
      }
      return user;
    });

    res.status(200).json({
      usersWithRatings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const stores = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;

    let where = {};
    if (name) where.name = { contains: name, mode: "insensitive" };
    if (email) where.email = { contains: email, mode: "insensitive" };
    if (address) where.address = { contains: address, mode: "insensitive" };

    const stores = await prisma.store.findMany({
      where,
      include: {
        owner: {
          select: { name: true, email: true },
        },
        ratings: {
          select: { rating: true },
        },
      },
      orderBy: { [sortBy]: sortOrder },
    });

    res.status(200).json({
      stores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const addStore = async (req, res) => {
  const parseData = validateStore.safeParse(req.body);
  if (!parseData.success) {
    const errors = parseData?.error?.issues;
    const errorMessages = errors.map((error) => error?.message);

    return res.status(400).json({
      error: errorMessages,
    });
  }

  const { name, email, address, ownerId } = parseData.data;

  try {
    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId: parseInt(ownerId),
      },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      store,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = { dashboard, addUser, users, stores, addStore };
