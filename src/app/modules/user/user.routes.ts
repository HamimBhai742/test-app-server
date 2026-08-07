import { Router } from "express";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = Router();

router.get("/me", auth("user", "admin"), UserController.getMe);

router.patch(
  "/me",
  auth("user", "admin"),
  validateRequest(UserValidation.updateProfileValidationSchema),
  UserController.updateMe
);

router.post("/upload-avatar", auth("user", "admin"), UserController.uploadAvatar);

router.post("/me/claim-daily-login", auth("user", "admin"), UserController.claimDailyLogin);
router.post("/me/claim-daily-tx", auth("user", "admin"), UserController.claimDailyTx);
router.post("/me/add-points", auth("user", "admin"), UserController.addPoints);
router.get("/leaderboard", auth("user", "admin"), UserController.getLeaderboard);

router.get("/", auth("admin"), UserController.getAllUsers);

router.get("/:id", auth("admin"), UserController.getUserById);

router.patch(
  "/:id/status",
  auth("admin"),
  validateRequest(UserValidation.updateUserStatusValidationSchema),
  UserController.updateUserStatus
);

export const userRoutes = router;
