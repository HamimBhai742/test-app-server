import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { transactionRoutes } from "../modules/transaction/transaction.routes";
import { dueRoutes } from "../modules/due/due.routes";
import { NotificationRoutes } from "../modules/notification/notification.route";
import { goalRoutes } from "../modules/goal/goal.routes";
import { investmentRoutes } from "../modules/investment/investment.routes";

export const router = Router();

const moduleRoutes: Array<{ path: string; route: Router }> = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/transactions",
    route: transactionRoutes,
  },
  {
    path: "/dues",
    route: dueRoutes,
  },
  {
    path: "/notifications",
    route: NotificationRoutes,
  },
  {
    path: "/goals",
    route: goalRoutes,
  },
  {
    path: "/investments",
    route: investmentRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

