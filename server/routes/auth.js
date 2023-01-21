import express from "express";

import auth from "../middlewares/verifyToken.js";
import {
  registerUser,
  registerConfirm,
  loginUser,
  logoutUser,
  passwordReset,
  passwordResetConfirmToken,
  deleteAccount,
  deleteAccountConfirm,
  //profileData
} from "../controllers/Authorization/authController.js";
import { validationRegister } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/api/auth/register", validationRegister, registerUser);

router.post("/api/auth/register/:token", registerConfirm);

router.post("/api/auth/login", loginUser);

router.post("/api/auth/logout", auth, logoutUser);

router.post("/api/auth/password-reset", passwordReset);

router.post(
  "/api/auth/password-reset/:confirm_token/:id",
  passwordResetConfirmToken
);

router.post("/api/auth/delete-account", auth, deleteAccount);

router.post("/api/auth/delete-account-confirm/:confirm_token/:id", auth, deleteAccountConfirm);

// router.get("/api/auth/profile", auth, profileData);

export default router;



