import { Router } from "express";
import { auth } from "../../middleware/auth";
import { InvestmentController } from "./investment.controller";

const router = Router();

router.get("/", auth("user", "admin"), InvestmentController.getAllInvestments);
router.post("/", auth("user", "admin"), InvestmentController.createInvestment);
router.patch("/:id", auth("user", "admin"), InvestmentController.updateInvestment);
router.delete("/:id", auth("user", "admin"), InvestmentController.deleteInvestment);

router.post("/:investmentId/logs", auth("user", "admin"), InvestmentController.addLog);
router.patch("/:investmentId/logs/:logId", auth("user", "admin"), InvestmentController.updateLog);
router.delete("/:investmentId/logs/:logId", auth("user", "admin"), InvestmentController.deleteLog);

export const investmentRoutes = router;
