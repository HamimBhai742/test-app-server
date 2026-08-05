import { Router } from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { TransactionController } from "./transaction.controller";
import { TransactionValidation } from "./transaction.validation";

const router = Router();

router.get("/", auth("user", "admin"), TransactionController.getAllTransactions);

router.post(
  "/",
  auth("user", "admin"),
  validateRequest(TransactionValidation.createTransactionValidationSchema),
  TransactionController.createTransaction
);

router.delete("/all", auth("user", "admin"), TransactionController.deleteAllTransactions);

router.delete("/:id", auth("user", "admin"), TransactionController.deleteTransaction);

export const transactionRoutes = router;
