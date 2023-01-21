import express from "express"

import auth from "../middlewares/verifyToken.js";
import {
    createCategory, 
    getCategory, 
    getCategories, 
    updateCategory, 
    deleteCategory
} from "../controllers/Category/categoryController.js"

const router = express.Router();

router.post("/api/category", auth, createCategory);

router.get("/api/category/:id([0-9]+)", auth, getCategory);

router.get("/api/categorys", auth, getCategories);

router.patch("/api/category/:id([0-9]+)", auth, updateCategory);

router.delete("/api/category/:id([0-9]+)", auth, deleteCategory);


export default router;

