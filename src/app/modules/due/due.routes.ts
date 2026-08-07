import { Router } from "express";
import { auth } from "../../middleware/auth";
import { DueController } from "./due.controller";

const router = Router();

router.get("/", auth("user", "admin"), DueController.getAllDues);
router.post("/", auth("user", "admin"), DueController.createDue);
router.patch("/:id/settle", auth("user", "admin"), DueController.toggleSettleDue);
router.patch("/:id", auth("user", "admin"), DueController.updateDue);
router.delete("/:id", auth("user", "admin"), DueController.deleteDue);

export const dueRoutes = router;
