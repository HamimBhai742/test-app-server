import { Router } from "express";
import { DueController } from "./due.controller";

const router = Router();

router.get("/", DueController.getAllDues);
router.post("/", DueController.createDue);
router.patch("/:id/settle", DueController.toggleSettleDue);
router.delete("/:id", DueController.deleteDue);

export const dueRoutes = router;
