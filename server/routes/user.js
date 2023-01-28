import express from 'express';

import auth from "../middlewares/verifyToken.js";

import { CreateUser, GetUser, UpdateUser, DeleteUser, GetUsers } 
from "../controllers/User/UserController.js";

const router = express.Router();

router.post("/api/user", CreateUser);
router.get("/api/user/:id", GetUser);
router.patch("/api/user/:id", UpdateUser);
router.delete("/api/user/:id", DeleteUser);
router.get("/api/users", GetUsers);

export default router;