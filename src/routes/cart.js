import express  from "express";
import { addToCart, get } from "../controllers/cart";


const router = express.Router()

router.post("/cart", addToCart)
router.get("/cart/:userId", get)

export default router