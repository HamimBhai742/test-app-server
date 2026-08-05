import { Router } from "express";
import { auth } from "../../middleware/auth";
import { DueController } from "./due.controller";

const router = Router();

router.get("/", auth("user", "admin"), DueController.getAllDues);
router.post("/", auth("user", "admin"), DueController.createDue);
router.patch("/:id/settle", auth("user", "admin"), DueController.toggleSettleDue);
router.delete("/:id", auth("user", "admin"), DueController.deleteDue);

export const dueRoutes = router;
