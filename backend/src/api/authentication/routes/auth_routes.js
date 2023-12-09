import express from "express";
import { login, signup, getUserAfterLogin } from "../controller/auth_controller.js";

const AuthRoutes = express.Router();

//POST LOGIN
AuthRoutes.post("/login", login);

//POST SIGNUP
AuthRoutes.post("/signup", signup);

AuthRoutes.get("/getUserAfterLogin", getUserAfterLogin);

export default AuthRoutes;
