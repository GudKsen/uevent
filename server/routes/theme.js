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

router.post("/api/theme", auth, CreateTheme);
router.get("/api/theme/:id", auth, GetTheme);
router.get("/api/themes", auth, GetAllThemes);
router.patch("/api/theme/:id", auth, UpdateTheme);
router.delete("/api/theme/:id", auth, DeleteTheme);

export default router;    

