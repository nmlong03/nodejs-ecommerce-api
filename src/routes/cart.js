import express  from "express";
import { addToCart, getCart } from "../controllers/cart";


const router = express.Router()

router.post("/cart", addToCart)
router.get("/cart/:userId", getCart)

export default router