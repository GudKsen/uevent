import express from 'express';

import auth from "../middlewares/verifyToken.js";

import {
    CreateTheme,
    GetTheme,
    GetAllThemes,
    UpdateTheme,
    DeleteTheme
} from "../controllers/Theme/ThemeController.js";

const router = express.Router();

router.post("/api/theme",   CreateTheme);
router.get("/api/theme/:id",   GetTheme);
router.get("/api/themes",   GetAllThemes);
router.patch("/api/theme/:id",   UpdateTheme);
router.delete("/api/theme/:id",   DeleteTheme);

export default router;    

