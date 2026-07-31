import { Router } from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { TransactionController } from "./transaction.controller";
import { TransactionValidation } from "./transaction.validation";

const router = Router();

router.get("/", TransactionController.getAllTransactions);

router.post(
  "/",
  validateRequest(TransactionValidation.createTransactionValidationSchema),
  TransactionController.createTransaction
);

router.delete("/all", TransactionController.deleteAllTransactions);

router.delete("/:id", TransactionController.deleteTransaction);

export const transactionRoutes = router;
