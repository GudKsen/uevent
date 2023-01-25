import express from 'express';

import auth from "../middlewares/verifyToken.js";

import {
    CreateFormat,
    GetFormat,
    GetAllFormats,
    UpdateFormat,
    DeleteFormat
} from "../controllers/Format/FormatController.js";

const router = express.Router();

router.post("/api/format", CreateFormat);
router.get("/api/format/:id", auth, GetFormat);
router.get("/api/formats", auth, GetAllFormats);
router.patch("/api/format/:id", auth, UpdateFormat);
router.delete("/api/format/:id", auth, DeleteFormat);

export default router;    

