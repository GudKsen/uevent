import express from 'express';

import auth from "../middlewares/verifyToken.js";

import {
    CreateTheme,
    ReadTheme,
    UpdateTheme,
    DeleteTheme,
    ReadAllThemes
} from "../controllers/Theme/themeController.js";

const router = express.Router();

router.post("/api/theme", auth, CreateTheme);
router.get("/api/theme/:id", auth, ReadTheme);
router.get("/api/themes", auth, ReadAllThemes);
router.patch("/api/theme/:id", auth, UpdateTheme);
router.delete("/api/theme/:id", auth, DeleteTheme);

export default router;

