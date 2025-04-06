import express, { Router } from "express";
import { getUser } from "../controllers/userControllers";

const router: Router = express.Router();

router.get("/:userid", getUser);

export default router;
