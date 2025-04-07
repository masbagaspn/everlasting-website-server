import express, { Router } from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/invitationController";

const router: Router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/create", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
