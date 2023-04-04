import express from 'express';
import multer from "multer";

import auth from "../middlewares/verifyToken.js";
import { multerFilter, multerStorageUser } from "../utils/Media/multerFunc.js";

import { CreateUser, GetUser, UpdateUser, DeleteUser, GetUsers } 
from "../controllers/User/UserController.js";

const router = express.Router();

const upload = multer({
    storage: multerStorageUser,
    fileFilter: multerFilter,
});

router.post("/api/user", CreateUser);
router.get("/api/user/:id", GetUser);
router.patch("/api/user/:id", auth, upload.single("file"), UpdateUser);
router.delete("/api/user/:id", DeleteUser);
router.get("/api/users", GetUsers);

export default router;