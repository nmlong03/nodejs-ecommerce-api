import express  from "express";
import { addToCart, decrement, deleteItemCart, getCart, increment } from "../controllers/cart";


const router = express.Router()

router.post("/cart", addToCart)
router.get("/cart/:userId", getCart)
router.delete('/cart/:id', deleteItemCart)
router.put('/cart/:cartId/increment', increment);
router.put('/cart/:cartId/decrement', decrement);
export default router