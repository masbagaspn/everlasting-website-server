import express, { Router } from "express";
import { getById } from "../controllers/userControllers";

const router: Router = express.Router();

router.get("/", getById);

export default router;
