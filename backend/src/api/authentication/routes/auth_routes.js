import express from "express";
import { login, signup, getUserAfterLogin, updateUserInfos } from "../controller/auth_controller.js";

const AuthRoutes = express.Router();

//POST LOGIN
AuthRoutes.post("/login", login);

//POST SIGNUP
AuthRoutes.post("/signup", signup);
AuthRoutes.post("/update-user", updateUserInfos);

AuthRoutes.get("/getUserAfterLogin", getUserAfterLogin);

export default AuthRoutes;
