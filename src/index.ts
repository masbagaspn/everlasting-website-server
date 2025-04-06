import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import authMiddleware from "./middleware/auth";
import { seedRoles } from "./seeders/roles";
import { seedPersonTypes } from "./seeders/personTypes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Replace with your frontend URL
    credentials: true, // ✅ Allow cookies & auth headers
  })
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", authMiddleware, userRoutes);

sequelize
  .sync({ force: true })
  .then(seedRoles)
  .then(seedPersonTypes)
  .then(() => {
    console.log("Connected to port 5000!");
    app.listen(5000);
  });
