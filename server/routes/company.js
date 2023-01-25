import express from 'express';

import auth from "../middlewares/verifyToken.js";

import { CreateCompany, GetCompany, GetCompanies, UpdateCompany, DeleteCompany } from
"../controllers/Company/CompanyController.js";

const router = express.Router();

router.post("/api/company", auth, CreateCompany);
router.get("/api/company/:id", auth, GetCompany);
router.get("/api/companies", auth, GetCompanies);
router.patch("/api/company/:id", auth, UpdateCompany);
router.delete("/api/company/:id", auth, DeleteCompany);


export default router;

