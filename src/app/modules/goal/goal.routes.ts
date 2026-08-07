import { Router } from "express";
import { auth } from "../../middleware/auth";
import { GoalController } from "./goal.controller";

const router = Router();

router.get("/", auth("user", "admin"), GoalController.getAllGoals);
router.post("/", auth("user", "admin"), GoalController.createGoal);
router.patch("/:id", auth("user", "admin"), GoalController.updateGoal);
router.delete("/:id", auth("user", "admin"), GoalController.deleteGoal);

router.post("/:goalId/savings", auth("user", "admin"), GoalController.addSavings);
router.patch("/:goalId/savings/:savingsLogId", auth("user", "admin"), GoalController.updateSavings);
router.delete("/:goalId/savings/:savingsLogId", auth("user", "admin"), GoalController.deleteSavings);

export const goalRoutes = router;
