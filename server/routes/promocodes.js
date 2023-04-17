import express from 'express';

import auth from "../middlewares/verifyToken.js";

import {
    CreatePromocode,
    GetPromocode,
    GetAllPromocode,
    UpdatePromocode,
    GetAllPromocodeByIdUser,
    DeletePromocode
} from "../controllers/Promocode/PromocodeController.js";

const router = express.Router();

router.post("/api/promocode",  auth, CreatePromocode);
router.get("/api/promocode/:id", auth,   GetPromocode);
router.get("/api/promocode", auth,   GetAllPromocode);
router.get("/api/promocodesId", auth,   GetAllPromocodeByIdUser);
router.patch("/api/promocode/:id", auth,  UpdatePromocode);
router.delete("/api/promocode/:id", auth,  DeletePromocode);

export default router;    

