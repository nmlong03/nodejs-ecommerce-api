import express from "express";
import { create, get, getAll } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();
router.get("/categories/:id", get);
router.post("/categories", create);
router.get('/categories', getAll)
export default router;
