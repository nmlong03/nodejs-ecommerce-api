import express from "express";
import { create, get } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();
router.get("/categories/:id", get);
router.post("/categories", create);

export default router;
