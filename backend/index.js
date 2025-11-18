require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const storeRoutes = require("./routes/store");
const adminRoutes = require("./routes/admin");

// Middleware
app.use(helmet());
app.use(cors({}));
app.use(morgan("combined"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
