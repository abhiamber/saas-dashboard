import express from "express"
export const allRoutes = express.Router();

import { create_user_routes } from "../controllers/auth/api/create_user_routes"
import { user_login_routes } from "../controllers/auth/api/user_login_routes"
allRoutes.use("/", create_user_routes);
allRoutes.use("/", user_login_routes);




