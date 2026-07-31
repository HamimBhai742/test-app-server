import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { transactionRoutes } from "../modules/transaction/transaction.routes";

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
