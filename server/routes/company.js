import express from "express";
import multer from "multer";

import auth from "../middlewares/verifyToken.js";

import { multerFilter, multerStorageCompany } from "../utils/Media/multerFunc.js";

import {
  generateConfirmNumber,
  CreateCompany,
  GetCompany,
  GetCompanies,
  UpdateCompany,
  DeleteCompany,
  GetCompanyByUser,
  GetEventsByCompany,
  UpdateAvatar,
} from "../controllers/Company/CompanyController.js";

const router = express.Router();

const upload = multer({
    storage: multerStorageCompany,
    fileFilter: multerFilter,
});

router.get("/api/generate", auth, generateConfirmNumber);
router.post("/api/company", auth, CreateCompany);
router.get("/api/company/:id([0-9]+)", GetCompany);
router.get("/api/company/user", auth, GetCompanyByUser);
router.get("/api/companies", auth, GetCompanies);
router.patch("/api/company/:id", auth, upload.single("file"), UpdateCompany);
router.delete("/api/company/:id", auth, DeleteCompany);
router.get("/api/company/:id/events", auth, GetEventsByCompany);
router.patch("/api/company/:id/avatar", auth, upload.single("file"), UpdateAvatar);

export default router;
