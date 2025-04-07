import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import userInvitationRoutes from "./routes/invitation";
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
app.use("/user-invitations", authMiddleware, userInvitationRoutes);

sequelize
  .sync({ alter: true })
  .then(seedRoles)
  .then(seedPersonTypes)
  .then(() => {
    console.log("Connected to port 5000!");
    app.listen(5000);
  });
