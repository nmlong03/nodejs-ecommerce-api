import express from "express";
import productRouter from "./routes/product";
import categoryRouter from "./routes/category";
import authRouter from "./routes/auth";
import uploadRouter from "./routes/upload"
import cartRouter from "./routes/cart"
import cors from "cors";
import mongoose from "mongoose";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// router
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", authRouter);
app.use("/api", uploadRouter)
app.use("/api", cartRouter)
mongoose.connect("mongodb://127.0.0.1:27017/projectReact");

export const viteNodeApp = app;


