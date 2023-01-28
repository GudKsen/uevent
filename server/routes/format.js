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
router.get("/api/format/:id",    GetFormat);
router.get("/api/formats",    GetAllFormats);
router.patch("/api/format/:id",    UpdateFormat);
router.delete("/api/format/:id",    DeleteFormat);

export default router;    

